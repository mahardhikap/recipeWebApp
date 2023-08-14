function Footer() {
  return (
    <>
      <footer className="text-center bg-warning pt-5">
        <h1 className="mt-5 text-purple">Eat, Cook, Repeat</h1>
        <p>Share Your Best Recipe By Uploading Here !</p>
        <div className="row justify-content-end m-0 p-0 mt-5 pt-5 pb-4">
          <div className="d-flex justify-content-center col-lg-4">
            <ul className="list-unstyled d-flex gap-3">
              <li>Product</li>
              <li>Company</li>
              <li>Learn More</li>
              <li>Get In Touch</li>
            </ul>
          </div>
          <div className="col-lg-4 fw-bolder">&copy;Pijar Camp</div>
        </div>
      </footer>
    </>
  );
}

export default Footer
