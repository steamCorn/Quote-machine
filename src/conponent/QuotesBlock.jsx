import React from 'react';
import ColorFile from '../ColorFileData';
import './quotesBlock.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

class QuotesBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quotes: [],
            quoteShow: {},
            color: '',
        };
        this.selectRandomQuote = this.selectRandomQuote.bind(this);
        this.changeQuote = this.changeQuote.bind(this);
    }
    componentDidMount() {
        fetch(
            'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
        )
            .then((data) => data.json())
            .then((data) =>
                this.setState({ quotes: data.quotes }, () => {
                    this.setState({
                        quoteShow: this.selectRandomQuote(),
                        color: this.selectRandomColor(),
                    });
                }),
            );
    }
    selectRandomQuote() {
        return this.state.quotes[
            Math.floor(Math.random() * this.state.quotes.length)
        ];
    }
    selectRandomColor() {
        return ColorFile[Math.floor(Math.random() * ColorFile.length)];
    }
    changeQuote() {
        this.setState({
            quoteShow: this.selectRandomQuote(),
            color: this.selectRandomColor(),
        });
    }
    render() {
        const stylesObj = {
            background: this.state.color,
            color: this.state.color,
            transition: 'all .9s ease',
        };

        const tweetUrl =
            'https://twitter.com/intent/tweet?hashtags=quoteFromMyApp&text=' +
            encodeURIComponent(
                this.state.quoteShow.quote + '  ' + this.state.quoteShow.author,
            );

        return (
            <div className="pageQuote" style={stylesObj}>
                <div className="container-qb">
                    <h2 id="titel">Start your day with new quote:</h2>
                    <div id="quote-box">
                        <div className="context">
                            <div id="text">{this.state.quoteShow.quote}</div>
                            <div id="author">{this.state.quoteShow.author}</div>
                        </div>
                        <div className="buttons-quote">
                            <a
                                id="tweet-quote"
                                className="one-social-button"
                                href={tweetUrl}
                                title="Tweet this quote!"
                                target="_blank"
                                style={{ background: this.state.color }}
                            >
                                <span id="twitt-icon">
                                    <FontAwesomeIcon icon={faTwitter} />
                                </span>
                                Tweet this quote!
                            </a>

                            <button
                                id="new-quote"
                                onClick={this.changeQuote}
                                style={{ background: this.state.color }}
                            >
                                Next Quote
                            </button>
                        </div>
                    </div>
                    <footer>
                        <div className="footer">
                            by steamCorn
                            {/* <SocialFollow style={{background : this.state.color}}/> */}
                        </div>
                    </footer>
                </div>
            </div>
        );
    }
}

export default QuotesBlock;
