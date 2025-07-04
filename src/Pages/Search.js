import './Search.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = (props) => {
  const [query, setQuery] = useState('');
  const [companies, setCompanies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://tender-56x1.onrender.com/api/companyRoutes/search?query=${encodeURIComponent(query)}&page=${page}`);
        const data = await res.json();
        setCompanies(data.results || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error('Failed to fetch companies', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [query, page]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setPage(1);
  };

  const handleCompanyClick = (company) => {
    navigate(`/company/${company._id}`, { state: { company } });
  };

  return (
    <div className="company-page" data-mode={props.mode}>
      <h1>Find Companies</h1>

      <input
        className="search-bar"
        type="text"
        placeholder="Search by company name, industry, or products/services"
        value={query}
        onChange={handleInputChange}
      />

      <h3>Browse by Industry</h3>
      <div className="industry-tags">
        {[
          { label: 'Construction', value: 'Construction & Civil Works' },
          { label: 'IT', value: 'Information Technology (IT)' },
          { label: 'Electrical Works', value: 'Electrical Equipment & Works' },
          { label: 'Healthcare', value: 'Healthcare & Medical Equipment' },
          { label: 'Roads', value: 'Roads & Bridges' },
          { label: 'Education', value: 'Education & Training' },
          { label: 'Consultancy', value: 'Consultancy Services' },
          { label: 'Agriculture', value: 'Agriculture & Allied Services' },
          { label: 'Logistics', value: 'Transportation & Logistics' },
          { label: 'Telecom', value: 'Telecommunications' },
          { label: 'Security', value: 'Security Services' },
          { label: 'Water Supply', value: 'Water Supply & Sanitation' },
          { label: 'Office Supplies', value: 'Office Equipment & Stationery' },
          { label: 'Environment', value: 'Environmental Services' },
          { label: 'Machinery', value: 'Machinery & Industrial Supplies' }
        ].map(({ label, value }) => (
          <span key={value} onClick={() => { setQuery(value); setPage(1); }}>
            {label}
          </span>
        ))}
      </div>

      <h3>Featured Companies</h3>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="company-grid">
          {companies.length > 0 ? (
            companies.slice(0, 12).map((company, index) => (
              <div
                key={index}
                className="company-card"
                onClick={() => handleCompanyClick(company)}
              >
                <img
                  src={
                    company.logo
                      ? company.logo
                      : 'https://dummyimage.com/100x100/cccccc/000000.png&text=Logo'
                  }
                  alt={company.name}
                  style={{
                    borderRadius: '8px',
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <h4>{company.name}</h4>
                <p>{company.industry || company.category}</p>
              </div>
            ))
          ) : (
            <p>No companies found.</p>
          )}
        </div>
      )}

      <div className="pagination">
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
          &lt;
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={page === i + 1 ? 'active' : ''}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Search;