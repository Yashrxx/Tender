import { Fragment, useContext, useEffect, useState, useRef } from 'react';
import './Tenders.css';
import { UserContext } from '../context/userContext';

const Tenders = () => {
  const { user } = useContext(UserContext);
  const [tenders, setTenders] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const rowRefs = useRef([]);

  useEffect(() => {
    const fetchTenders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('https://tender-client.onrender.com/api/tenderRoutes/newTender', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token
          }
        });
        const data = await res.json();
        setTenders(data);
      } catch (err) {
        console.error("Error fetching tenders:", err);
      }
    };
    fetchTenders();
  }, [user]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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

  return (
    <div className="tender-page">
      <aside className="filter-panel">
        <input type="text" className="search-input" placeholder="Search tenders" />
        <h3>Filters</h3>
        <select><option>All categories</option></select>
        <select><option>All locations</option></select>
        <select><option>All statuses</option></select>
        <select><option>All dates</option></select>
        <button className="filter-btn">Apply Filters</button>
      </aside>

      <main className="tender-table-section">
        <h1>Tenders</h1>
        <div className="table-container">
          <table className="tender-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Location</th>
                <th>Status</th>
                <th>Deadline</th>
              </tr>
            </thead>
            <tbody>
              {tenders.map((tender, index) => (
                <Fragment key={tender._id}>
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
        </div>
      </main>
    </div>
  );
};

export default Tenders;