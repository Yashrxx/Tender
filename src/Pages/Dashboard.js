import './Dashboard.css';
import { useEffect, useState, useContext, Fragment, useRef } from 'react';
import { UserContext } from '../context/userContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [tenders, setTenders] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const rowRefs = useRef([]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleRowClick = (index) => {
    setExpandedRow(prev => (prev === index ? null : index));
    setTimeout(() => {
      rowRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
  };

  const toggleDescription = (index) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  useEffect(() => {
    const fetchCompanyTenders = async () => {
      setLoading(true); // 👈 Start loading
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('https://tender-56x1.onrender.com/api/tenderRoutes/newTender', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token
          }
        });
        const data = await res.json();
        console.log("Fetched company tenders:", data);
        setTenders(data);
      } catch (err) {
        console.error("Error fetching company's tenders:", err);
      }
      setLoading(false); // 👈 Stop loading
    };
    fetchCompanyTenders();
  }, [user]);

  const [loading, setLoading] = useState(true);
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return isNaN(date.getTime())
      ? "N/A"
      : date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
  };

  return (
    <div className="tenders-container">
      <div className="header">
        <h1>My Tenders</h1>
        <Link className="new-tender" to="/applications">New Tender</Link>
      </div>
      <div className="filters-scroll">
        {["All",
          "Construction & Civil Works",
          "Information Technology (IT)",
          "Electrical Equipment & Works",
          "Healthcare & Medical Equipment",
          "Roads & Bridges",
          "Education & Training",
          "Consultancy Services",
          "Agriculture & Allied Services",
          "Transportation & Logistics",
          "Telecommunications",
          "Security Services",
          "Water Supply & Sanitation",
          "Office Equipment & Stationery",
          "Environmental Services",
          "Machinery & Industrial Supplies"
        ].map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`category-button ${selectedCategory === cat ? "active-filter" : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>


      {loading ? (
        <div className="loading-spinner"></div>
      ) : (<table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Location</th>
            <th>Status</th>
            <th>Published</th>
            <th>Deadline</th>
          </tr>
        </thead>
        <tbody>
          {tenders
            .filter((tender) =>
              selectedCategory === "All" ? true : tender.category === selectedCategory
            )
            .map((tender, index) => (

              <Fragment key={tender.id}>
                <tr
                  onClick={() => handleRowClick(index)}
                  className="cursor-pointer"
                  ref={el => rowRefs.current[index] = el}
                >
                  <td>{tender.title}</td>
                  <td className="text-blue">{tender.category}</td>
                  <td className="text-blue">{tender.location}</td>
                  <td>
                    <span className="status-badge">
                      {tender.status}
                    </span>
                  </td>
                  <td>{formatDate(tender.deadline)}</td>
                  <td>{formatDate(tender.createdAt)}</td>
                </tr>

                {expandedRow === index && (
                  <tr>
                    <td colSpan="5">
                      <div className="dropdown-details">
                        <p>
                          <strong>Description:</strong>{' '}
                          {expandedDescriptions[index]
                            ? tender.description
                            : `${tender.description.slice(0, 200)}...`}
                        </p>

                        {tender.company ? (
                          <>
                            <p><strong>Company:</strong> {tender.company.name}</p>
                            <p><strong>Phone:</strong> {tender.company.phone}</p>
                          </>
                        ) : (
                          <>
                            <p><strong>Company:</strong> Not provided</p>
                            <p><strong>Phone:</strong> Not available</p>
                          </>
                        )}

                        <p><strong>Budget:</strong> ₹{tender.budget}</p>
                      </div>
                      {tender.description.length > 200 && (
                        <div className="view-more-container">
                          <button
                            className="view-more-btn"
                            onClick={() => toggleDescription(index)}
                          >
                            {expandedDescriptions[index] ? 'View Less ↑' : 'View More →'}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
        </tbody>
      </table>
      )}
    </div>
  );
};

export default Dashboard;