// This is the Link API
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import SearchForm from '../components/SearchForm';
import SearchFormSelect from '../components/SearchFormSelect';

// Pass this content as 'props' to child components
const Index = props => (
  <div className="pageCon">

  <h1>Batman TV Shows</h1>
  <ul>
    {props.shows.map(({show}) => (
      <li key={show.id}>
        <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
          <a>{show.name}</a>
        </Link>         
      </li>
    ))}
  </ul>
  <style jsx>{`
                /* CSS for this page */
                .pageCon{
                  border-radius:.5em;
                  width:80%;
                  margin:auto;
                  background-color: #b3b3b3;
                  padding: 1em;
                }
                .menu {
                  display: flex;
                  flex-direction: row;
                  margin: 0;
                  padding: 0;
                  margin-top: 20px;
                }
                .menu li {
                  display: inline-table;
                  padding-left: 20px;
                  
                }
                .menu li a {
                  font-size: 1em;
                  color: black;
                  display: block;
                  text-decoration: none;
                }
                .menu li a:hover {
                  color: rgb(255, 187, 0);
                  text-decoration: underline;
                }
                `}</style>
  </div>
);

Index.getInitialProps = async function() {

  const url = 'https://api.tvmaze.com/search/shows?q=batman';

  const res = await fetch(url)
  const data = await res.json()

  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    shows: data
  }
}

export default Index