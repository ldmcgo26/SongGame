const login_uri = 'http://localhost:3000/auth'

export default function Login() {
    return (
        <div className="flex justify-center flex-col ">
            <a
                className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-full"
                href={login_uri}
            >
                Login
            </a>
        </div>
    )
}
