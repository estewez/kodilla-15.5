App = React.createClass({
    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },
    handleSearch: function(searchingText) {
        this.setState({
            loading: true
        });
        this.getGif(searchingText)
        .then((resp) => {
            var data = JSON.parse(resp).data; 
            var gifNum = Math.floor(Math.random() * data.length);
            var gif = {  
                url: data[gifNum].images.fixed_width_downsampled.url,
                sourceUrl: data[gifNum].url
            }; 
            this.setState({ 
                loading: false, 
                gif: gif, 
                searchingText: searchingText 
            });
        })
        .catch(error => {
            console.log(error);
        });
    },
    getGif: function(searchingText, callback) { 
        return new Promise(function (resolve, reject) {
            var url = 'http://api.giphy.com/v1/gifs/search?q=' + searchingText + '&api_key=vbHVD8gM0h4cKfq4nD6L8EE7qARgHucy'; 
            var xhr = new XMLHttpRequest(); 
            xhr.open('GET', url);
            xhr.onload = function() {
                if (xhr.status === 200) {
                    resolve(xhr.response);
                } else {
                    reject(xhr.statusText)
                }
            };
            xhr.send();
        });
    },
    render: function() {

        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
          <div style={styles}>
                <h1>Wyszukiwarka GIFow!</h1>
                <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
                <Search onSearch={this.handleSearch}/>
                <Gif
                    loading={this.state.loading}
                    url={this.state.gif.url}
                    sourceUrl={this.state.gif.sourceUrl}
                />
          </div>
        );
    }
});