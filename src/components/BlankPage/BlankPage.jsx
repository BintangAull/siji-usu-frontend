export default function NotFound() {
    return (
        <div className="min-h-screen gradient-bg flex flex-col justify-center items-center p-4">
            <div className="max-w-md w-full bg-white shadow-custom rounded-lg p-8 text-center animate-fade-in card-hover">
                {/* Icon Error */}
                <div className="mb-6">
                    <svg
                        className="mx-auto h-24 w-24 text-brown-dark"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>

                {/* Error Message */}
                <h1 className="text-4xl font-bold text-brown-dark mb-4">
                    404
                </h1>
                <h2 className="text-2xl font-semibold text-brown-light mb-4">
                    Halaman Tidak Ditemukan
                </h2>
                <p className="text-gray-600 mb-8 font-light">
                    Maaf, halaman yang Anda cari tidak dapat ditemukan atau tidak tersedia.
                </p>

                {/* Back Button */}
                <button
                    onClick={() => window.history.back()}
                    className="inline-flex items-center px-6 py-3 bg-brown-dark text-white font-medium rounded-lg
                     hover:bg-brown-light transition-all duration-300 ease-in-out
                     transform hover:scale-105 shadow-md"
                >
                    <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                    Kembali
                </button>
            </div>
        </div>

    );
}
