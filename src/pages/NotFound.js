import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div>
      Whoops! Page not found. Please go to <Link to="/">Home page</Link>.
    </div>
  );
}
