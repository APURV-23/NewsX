import React, {useState,useEffect}  from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import wordsToNumbers from "words-to-numbers";
import useStyles from "./styles.js";
import NewsCards from "./components/NewsCards/NewsCards";


/*let prot = process.env.PORT || 2321;

pp.listen(port,()=>{
    console.log(`App is running at port no${port}`);
})*/

const alanKey = 'fb120fc5700bb8392769c851df3e72272e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {
    const [newsArticles,setNewsArticles] = useState([]);
    const classes = useStyles();
    const [activeArticle,setActiveArticle] = useState(-1);
  
    useEffect(() => {
        alanBtn({
            key:alanKey,
            onCommand: ({command,articles,number}) => {
              if(command === 'newHeadlines'){
               setNewsArticles(articles);
               setActiveArticle(-1);  
            }else if(command === 'highlight') {
                setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
            }else if(command === 'open'){

                const parsedNumber =number.length > 2 ? wordsToNumbers(number,{fuzzy:true}) :number;
                const article =articles[parsedNumber - 1];

                if(parsedNumber > 20){
                    alanBtn().playText("Please try that again.")

                }else if(article){
                    window.open(article.url,"_blank");
                    alanBtn.playText("Opening...")

                }
                
            }
        }
        })
    },[])
    return (
        <div>
            <div className={classes.logoContainer}>
                <img src="https://www.linkpicture.com/q/NewsX_img.jpg" height={300} width={300} className={classes.newsxlogo}  alt="Newsx logo"/>
            </div>       
        <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
        </div>
    );
}
export default App;