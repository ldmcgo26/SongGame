const login_uri = 'http://localhost:3000/auth'

export default function Login() {
    return (
        <div>
            <div className="flex justify-center bg-blue-500 text-9xl text-white px-4 py-2 rounded-full mb-4">
                <p>Song Game</p>
            </div>
            <div className="flex justify-center flex-col ">
                <a
                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-full"
                    href={login_uri}
                >
                    Login
                </a>
            </div>
        </div>
    )
}
