const login_uri =
    'https://cptm91ekpj.execute-api.us-east-1.amazonaws.com/dev/auth'

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
