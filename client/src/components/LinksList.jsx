import { Link } from 'react-router-dom';

const LinksList = ({ links }) => {
  if (!links.length) {
    return <p className="center">No links yet...</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Original</th>
          <th>Shorten</th>
          <th>Open</th>
        </tr>
      </thead>

      <tbody>
        {links.map((link, idx) => (
          <tr key={link._id}>
            <td>{idx + 1}</td>
            <td>{link.from}</td>
            <td>{link.to}</td>
            <td>
              <Link to={`/details/${link._id}`}>Open</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LinksList;
