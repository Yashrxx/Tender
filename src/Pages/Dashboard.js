import './Dashboard.css'

const Dashboard = () => {
  return (
    <div>
      <div className="tenders-container">
        <div className="header">
          <h1>Tenders</h1>
          <button className="new-tender">New Tender</button>
        </div>

        <div className="filters">
          <button>Status ⌄</button>
          <button>Category ⌄</button>
          <button>Region ⌄</button>
          <button>Published Date ⌄</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Tender</th>
              <th>Category</th>
              <th>Region</th>
              <th>Status</th>
              <th>Published Date</th>
              <th>Closing Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Construction of New Office Building</td>
              <td className="link">Construction</td>
              <td className="link">Midwest</td>
              <td><span className="status open">Open</span></td>
              <td>2024-01-15</td>
              <td>2024-02-29</td>
            </tr>
            <tr>
              <td>Supply of IT Equipment</td>
              <td className="link">Technology</td>
              <td className="link">Northeast</td>
              <td><span className="status closed">Closed</span></td>
              <td>2023-12-20</td>
              <td>2024-01-10</td>
            </tr>
            <tr>
              <td>Marketing Services for Product Launch</td>
              <td className="link">Marketing</td>
              <td className="link">Southeast</td>
              <td><span className="status open">Open</span></td>
              <td>2024-01-20</td>
              <td>2024-03-15</td>
            </tr>
            <tr>
              <td>Renovation of Existing Facility</td>
              <td className="link">Construction</td>
              <td className="link">Southwest</td>
              <td><span className="status open">Open</span></td>
              <td>2024-01-25</td>
              <td>2024-03-30</td>
            </tr>
            <tr>
              <td>Procurement of Medical Supplies</td>
              <td className="link">Healthcare</td>
              <td className="link">Midwest</td>
              <td><span className="status closed">Closed</span></td>
              <td>2023-12-10</td>
              <td>2024-01-05</td>
            </tr>
            <tr>
              <td>Consulting Services for Business Strategy</td>
              <td className="link">Consulting</td>
              <td className="link">Northeast</td>
              <td><span className="status open">Open</span></td>
              <td>2024-02-01</td>
              <td>2024-04-15</td>
            </tr>
            <tr>
              <td>Supply of Office Furniture</td>
              <td className="link">Office Supplies</td>
              <td className="link">Southeast</td>
              <td><span className="status open">Open</span></td>
              <td>2024-02-05</td>
              <td>2024-04-30</td>
            </tr>
            <tr>
              <td>Development of Mobile Application</td>
              <td className="link">Technology</td>
              <td className="link">Southwest</td>
              <td><span className="status closed">Closed</span></td>
              <td>2023-11-25</td>
              <td>2023-12-20</td>
            </tr>
            <tr>
              <td>Training Services for Employee Development</td>
              <td className="link">Training</td>
              <td className="link">Midwest</td>
              <td><span className="status open">Open</span></td>
              <td>2024-02-10</td>
              <td>2024-05-15</td>
            </tr>
            <tr>
              <td>Maintenance of Existing Infrastructure</td>
              <td className="link">Maintenance</td>
              <td className="link">Northeast</td>
              <td><span className="status open">Open</span></td>
              <td>2024-02-15</td>
              <td>2024-05-30</td>
            </tr>
          </tbody>
        </table>

        <div className="pagination">
          <button>&lt;</button>
          <button className="active">1</button>
          <button>2</button>
          <button>3</button>
          <span>...</span>
          <button>10</button>
          <button>&gt;</button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
