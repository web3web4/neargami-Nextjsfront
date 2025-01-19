import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      textAlign: "center",
      color: "#333",
    }}
  >
    <h1 style={{ fontSize: "4rem", marginBottom: "1rem" }}>404</h1>
    <p style={{ fontSize: "1.5rem", color:"white" }}>
      Oops! The page you're looking for doesn't exist.
    </p>
    <a
      href="/"
      style={{
        marginTop: "2rem",
        padding: "0.5rem 1rem",
        backgroundColor: "#0070f3",
        color: "#fff",
        borderRadius: "5px",
        textDecoration: "none",
      }}
    >
      Back to Home
    </a>
  </div>
);
}