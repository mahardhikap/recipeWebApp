function Footer() {
  return (
    <>
      <footer className="text-center bg-warning pt-5">
        <h1 className="mt-5 fw-bold" style={{color:'#2E266F'}}>Eat, Cook, Repeat</h1>
        <p className="fw-medium">Share Your Best Recipe By Uploading Here !</p>
        <div className="row justify-content-end m-0 p-0 mt-5 pt-5 pb-4">
          <div className="d-flex justify-content-center col-lg-4">
            <ul className="list-unstyled d-flex gap-3 fw-medium">
              <li>Product</li>
              <li>Company</li>
              <li>Learn More</li>
              <li>Get In Touch</li>
            </ul>
          </div>
          <div className="col-lg-4 fw-bolder"><a href="https://github.com/mahardhikap" className="text-decoration-none text-black"><span style={{color:'red'}}>&#10084;</span>Made With Love</a></div>
        </div>
      </footer>
    </>
  );
}

export default Footer
