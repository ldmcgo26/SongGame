const login_uri =
    'https://err9y13l2i.execute-api.us-east-1.amazonaws.com/dev/auth'

export default function Login() {
    return (
        <div className="font-mono flex flex-col justify-center">
            <p className="flex justify-center py-2">
                Welcome to Song Game! Sign in with Spotify:
            </p>
            <a
                className="flex justify-center bg-orange-300 border-2 border-slate-800 shadow-lg hover:bg-orange-500 text-slate-800 px-4 py-2 rounded-full mb-2"
                href={login_uri}
            >
                Login
            </a>
        </div>
    )
}
