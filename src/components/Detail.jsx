import { useState } from "react";
import PropTypes from "prop-types";

const Table = ({ title, data, headers }) => {
  const tableContainerStyle = {
    marginTop: "20px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const thTdStyle = {
    padding: "10px",
    textAlign: "center",
    border: "1px solid #ddd",
  };

  const thStyle = {
    ...thTdStyle,
    backgroundColor: "#007bff",
    color: "white",
    fontWeight: "bold",
  };

  return (
    <div style={tableContainerStyle}>
      <h3>{title}</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} style={thStyle}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} style={thTdStyle}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Detail = ({ jobData }) => {
  const header1 = ["Tên Job", "Kinh Nghiệm", "Lương"];
  const header2 = ["Tên Job", "Điểm Tên", "Kinh Nghiệm", "Khoảng cách", "Lương", "Quy mô công ty"];
  const header3 = [
    "Tên Job", "Điểm Tên", "Kinh Nghiệm", "Khoảng cách", "Lương", "Quy mô công ty", "Trọng Số Lương", "Trọng Số Kinh Nghiệm", "Trọng Số Tên Job", "Trọng Số Quy Mô Công Ty", "Trọng Số Khoảng Cách"
  ];

  const [currentPage, setCurrentPage] = useState(0);

  // Trọng số
  const salaryWeight = 0.05;
  const experienceWeight = 0.2;
  const jobTitleWeight = 0.5;
  const companySizeWeight = 0.05;
  const locationWeight = 0.2;

  // Số lượng hàng mỗi trang
  const rowsPerPage = 10;

  // Tính tổng số trang
  const totalPages = Math.ceil(jobData.length / rowsPerPage);

  // Lấy dữ liệu của trang hiện tại
  const currentPageData = jobData.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  // Dữ liệu bảng
  const scoreTable = currentPageData.map((job) => [
    job.job_title,
    job.experience,
    job.salary,
  ]);

  const normalizedTable = currentPageData.map((job) => [
    job.job_title,
    job.job_title_point.toFixed(2),
    job.experience_point.toFixed(2),
    job.location_point.toFixed(2),
    job.salary_point.toFixed(2),
    job.company_size_point.toFixed(2),
    `Công thức: (Điểm * Trọng số)`,
  ]);

  const weightedTable = currentPageData.map((job) => [
    job.job_title,
    job.weighted_job_title_point.toFixed(2),
    job.weighted_experience_point.toFixed(2),
    job.weighted_location_point.toFixed(2),
    job.weighted_salary_point.toFixed(2),
    job.weighted_company_size_point.toFixed(2),
    salaryWeight.toFixed(2),
    experienceWeight.toFixed(2),
    jobTitleWeight.toFixed(2),
    companySizeWeight.toFixed(2),
    locationWeight.toFixed(2),
  ]);

  return (
    <div>
      <Table title="Bảng Data" data={scoreTable} headers={header1} />
      
      <Table title="Bảng Chuẩn Hóa" data={normalizedTable} headers={header2} />
      {/* Thêm thẻ div cho công thức */}
      <div style={{ marginTop: "10px", fontStyle: "italic", color: "#555" }}>
        <p><strong>Công thức chuẩn hóa:</strong> Mỗi điểm được tính bằng cách nhân với trọng số tương ứng của mỗi yếu tố.</p>
      </div>

      <Table title="Bảng Nhân Trọng Số" data={weightedTable} headers={header3} />
      {/* Thêm thẻ div cho chú thích trọng số */}
      <div style={{ marginTop: "10px", fontStyle: "italic", color: "#555" }}>
        <p><strong>Trọng số:</strong> 
          <ul>
            <li>Lương: {salaryWeight}</li>
            <li>Kinh Nghiệm: {experienceWeight}</li>
            <li>Tên Job: {jobTitleWeight}</li>
            <li>Quy Mô Công Ty: {companySizeWeight}</li>
            <li>Khoảng Cách: {locationWeight}</li>
          </ul>
        </p>
      </div>

      {/* Điều hướng phân trang */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
          style={{
            padding: "10px 20px",
            margin: "0 5px",
            backgroundColor: currentPage === 0 ? "#e0e0e0" : "#4caf50",
            color: currentPage === 0 ? "#9e9e9e" : "white",
            border: "none",
            borderRadius: "25px",
            fontSize: "14px",
            fontWeight: "bold",
            cursor: currentPage === 0 ? "not-allowed" : "pointer",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
            if (currentPage !== 0) e.target.style.backgroundColor = "#45a049";
          }}
          onMouseOut={(e) => {
            if (currentPage !== 0) e.target.style.backgroundColor = "#4caf50";
          }}
        >
          Trang Trước
        </button>
        <span
          style={{
            margin: "0 15px",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#333",
            display: "inline-block",
            padding: "5px 15px",
            border: "1px solid #ddd",
            borderRadius: "20px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          Trang {currentPage + 1} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={currentPage === totalPages - 1}
          style={{
            padding: "10px 20px",
            margin: "0 5px",
            backgroundColor: currentPage === totalPages - 1 ? "#e0e0e0" : "#4caf50",
            color: currentPage === totalPages - 1 ? "#9e9e9e" : "white",
            border: "none",
            borderRadius: "25px",
            fontSize: "14px",
            fontWeight: "bold",
            cursor: currentPage === totalPages - 1 ? "not-allowed" : "pointer",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
            if (currentPage !== totalPages - 1) e.target.style.backgroundColor = "#45a049";
          }}
          onMouseOut={(e) => {
            if (currentPage !== totalPages - 1) e.target.style.backgroundColor = "#4caf50";
          }}
        >
          Trang Sau
        </button>
      </div>
    </div>
  );
};

// Định nghĩa PropTypes
Table.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.array).isRequired,
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Detail.propTypes = {
  jobData: PropTypes.arrayOf(
    PropTypes.shape({
      job_title: PropTypes.string.isRequired,
      experience: PropTypes.number.isRequired,
      salary: PropTypes.number.isRequired,

      
      distance_to_weighted_ideal: PropTypes.number.isRequired,
      distance_to_weighted_negative_ideal: PropTypes.number.isRequired,

      job_title_point: PropTypes.number.isRequired,
      experience_point: PropTypes.number.isRequired,
      location_point: PropTypes.number.isRequired,
      salary_point: PropTypes.number.isRequired,
      company_size_point: PropTypes.number.isRequired,

      weighted_job_title_point: PropTypes.number.isRequired,
      weighted_experience_point: PropTypes.number.isRequired,
      weighted_location_point: PropTypes.number.isRequired,
      weighted_salary_point: PropTypes.number.isRequired,
      weighted_company_size_pointalary: PropTypes.number,
    })
  ).isRequired,
};

export default Detail;
