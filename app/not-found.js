export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <div className="text-5xl mb-4">404</div>
        <h1 className="text-xl font-bold mb-2">Page Not Found</h1>
        <p className="text-zinc-400 text-sm mb-4">The page you're looking for doesn't exist.</p>
        <a href="/" className="text-indigo-400 hover:text-indigo-300 text-sm transition">
          Back to Home
        </a>
      </div>
    </div>
  );
}
