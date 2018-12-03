// This is the Link API
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import SearchForm from '../components/SearchForm';
import SearchFormSelect from '../components/SearchFormSelect';

const defaultNewsSource = 'financial-post';

const apiKey = '7a4f22a358c6450992213b8e3472496c';

async function getNews(url) {
  try {
    // Make async call
    const res = await fetch(url);
    // get json data when it arrives
    const data = await res.json();
    // return json data
    return (data);
  } catch (error) {
    // return error if it occurs
    return (error);
  }
  }
  
  function formatDate(input) {
    const date = new Date(input);
    const monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    const hour = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
  
    return `${day} ${monthNames[monthIndex]} ${year} ${hour}:${minutes}`;
  }
  
  export default class Finance extends React.Component {
    
      constructor(props) {
        super(props)
        this.state = {
          newsSource: "",
          url: "",
          articles: []
        }
      }
      // This function is passed to the SearchForm and used the get the value entered
      // This value will be used to generate the api url
      setNewsSource = (input) => {
        this.setState({
          newsSource: input,
          url: `https://newsapi.org/v2/top-headlines?sources=${input}&apiKey=${apiKey}`
        })
      }
    
      
      // Get all articles by searching for keyword(s)
      // https://newsapi.org/docs/endpoints/
      //
      searchNewsAPI = (event) => {
        // set state values - this will trigger an update and componentDidUpdate
        this.setState({
          // Get the link text
          newsSource: `${event.target.innerText}`,
          // Build the search URL using the link name
          url: `https://newsapi.org/v2/${event.target.name}&apiKey=${apiKey}`
        })
        console.log(this.state.url);
      }
    
      //
      // render() method generates the page
      //
      render() {
    
        // if state.articles is empty copy props to it
        if (this.state.articles.length == 0) {
          this.state.articles = this.props.articles;
        }
        return (
          <div className="pageCon">
            <div className="select">
            { /* Add the SearchForm component */}
            { /* Pass the setNewsSource function as a prop with the same name*/}
            <SearchForm setNewsSource={this.setNewsSource} />
            <SearchFormSelect setNewsSource={this.setNewsSource}/>
          </div>
            { /* Example search links - note using name attribute for parameters(!!) */}
            <ul className="newsMenu">
            <li><a href="#" onClick={this.searchNewsAPI} name="top-headlines?country=ie">Top Headlines Ireland</a></li>
            <li><a href="#" onClick={this.searchNewsAPI} name="top-headlines?country=ie&category=entertainment">Entertainment News</a></li>
            <li><a href="#" onClick={this.searchNewsAPI} name="everything?q=sport">Sports News</a></li>
            <li><a href="#" onClick={this.searchNewsAPI} name="everything?q=finance">Finance News</a></li>
          </ul>
            { /* Display a title based on source */}
            <h3>{this.state.newsSource.split("-").join(" ")}</h3>
            <div className="newsCons">
              { /* Iterate through articles using Array map) */}
              { /* Display author, publishedAt, image, description, and content */}
              { /* for each story. Also a link for more.. */}
              {this.state.articles.map((article, index) => (
                
                <section key={index}>
                  <h3>{article.title}</h3>
                  <p className="author">{article.author} {formatDate(article.publishedAt)}</p>
                  <img src={article.urlToImage} alt="article image" className="img-article"></img>
                  { /* adding the index value as a paramater to be passed with a request for the single article page*/}
                  <p><Link as={`/article/${index}`} href={`/article?id=${index}&source=${defaultNewsSource}`}><a>Click To Read More</a></Link></p>
                  </section>
                
              ))}
            </div>
    
            <style jsx>{`
                  /* CSS for this page */
                  .pageCon{
                    border-radius:.5em;
                    width:80%;
                    margin:auto;
                    background-color: #b3b3b3;
                    padding: 1em;
                  }
                  .select{
                    padding: 1em;
                    display: inline-block;
                  }
                 .newsCons{
                    border-radius:.5em;
                    width: 90%;
                    margin: auto;
                    background-color: #004d4d;
                    padding: 1.5em;
                  }
                  
                  section {
                    border-radius:.5em;
                    width: 45%;
                    height: 19em;
                    border: 1px solid black;
                    background-color: #d9d9d9;
                    padding: 0.5em;
                    margin: 1em;
                    display: inline-block;
                    text-align: center;
                    overflow:auto;
                  }
                .author {
                    font-style: italic;
                    font-size: 0.8em;
                  }
                .img-article {
                    max-width: 50%;
                  }
                .newsMenu {
                  display: flex;
                  flex-direction: row;
                  margin: 0;
                  padding: 0;
                  margin-top: 20px;
                }
                .newsMenu li {
                  display: inline-table;
                  padding-left: 20px;
                }
                .newsMenu li a {
                  font-size: 1em;
                  color: black;
                  display: block;
                  text-decoration: none;
                }
                .newsMenu li a:hover {
                  color: rgb(255, 187, 0);
                  text-decoration: underline;
                }
              `}</style>
          </div>
        );
      }
    
      //
      // Get initial data on server side using an AJAX call
      // This will initialise the 'props' for the News page
      //    
      static async getInitialProps(response) {
    
        // Build the url which will be used to get the data
        // See https://newsapi.org/s/the-irish-times-api
        const defaultUrl = `https://newsapi.org/v2/top-headlines?sources=${defaultNewsSource}&apiKey=${apiKey}`;
    
        // Get news data from the api url
        const data = await getNews(defaultUrl);
    
        // If the result contains and articles array then it is good so return articles
        if (Array.isArray(data.articles)) {
          return {
            articles: data.articles
          }
        }
        // Otherwise it contains an error, log and redirect to error page (status code 400)
        else {
          console.error(data)
          if (response) {
            response.statusCode = 400
            response.end(data.message);
          }
        }
      }
    
      // componentDidUpdate is called when the page state or props re updated
      // It can be over-ridden to perform other functions when an update occurs
      // Here it fetches new data using this.state.newsSource as the source
      async componentDidUpdate(prevProps, prevState) {
    
        // Check if newsSource url has changed to avoid unecessary updates 
        if (this.state.url !== prevState.url) {
    
          // Use api url (from state) to fetch data and call getNews()
          const data = await getNews(this.state.url);
    
          // If the result contains and articles array then it is good so update articles
          if (Array.isArray(data.articles)) {
            // Store articles in state
            this.state.articles = data.articles;
            // Force page update by changing state (make sure it happens!)
            this.setState(this.state);
          }
          // Otherwise it contains an error, log and redirect to error page (status code 400)
          else {
            console.error(data)
            if (response) {
              response.statusCode = 400
              response.end(data.message);
            }
          }
        }
      } // End componentDidUpdate
    
    
    
    } // End class
  