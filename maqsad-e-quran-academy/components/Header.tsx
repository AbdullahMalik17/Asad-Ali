"use client";

export default function Header() {
  return (
    <>
      {/* Top Bar */}
      <div className="bg-emerald-900 text-white text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-2">

          <p>🌙 Inspiring Hearts Through The Light Of The Quran</p>

          <div className="flex gap-6">
            <span>📧 maqsadquran@gmail.com</span>
            <span>📱 0330-1676985</span>
          </div>

        </div>
      </div>

      {/* Navbar */}
      <header className="bg-white shadow">

        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-5">

          {/* Logo */}
          <div>

            <h1 className="text-3xl font-bold text-emerald-900">
              Maqsad-e-Quran
            </h1>

            <p className="text-sm text-yellow-600">
              Online Quran Academy
            </p>

          </div>

          {/* Menu */}

          <nav className="hidden md:flex gap-8 text-gray-700 font-medium">

            <a href="#">Home</a>

            <a href="#">About</a>

            <a href="#">Courses</a>

            <a href="#">Teachers</a>

            <a href="#">Admissions</a>

            <a href="#">Reviews</a>

            <a href="#">Contact</a>

          </nav>

          {/* Button */}

          <button className="bg-emerald-800 hover:bg-emerald-900 text-white px-6 py-3 rounded-lg font-semibold">

            BOOK FREE TRIAL

          </button>

        </div>

      </header>
    </>
  );
}