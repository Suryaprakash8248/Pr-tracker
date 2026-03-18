import React from 'react'

function Footer() {
  const thisYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-white py-6  ">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-center  items-center ">
        <p>COPYRIGHT© {thisYear} </p>
      </div>
    </footer>
  )
}

export default Footer;