import React, {useState, useEffect} from 'react';

function Body(){
    return(
        <section className="wrapper">
            <div>
                <div>人気のお題</div>
                <OgiriList kind={"/api/odai/popular"} />
            </div>
            <div>
                <div>新着のお題</div>
                <OgiriList kind={"/api/odai/new"}/>
            </div>
            <div>
                <div>お題を作る</div>
                <OdaiSend />
            </div>
        </section>
    )
}
const OgiriList = (props:any) =>{
    const [odai, setOdai] = useState([""]);
    useEffect(() => {
        fetch(props.kind)
          .then((res) => res.json())
          .then((data) => setOdai(data.message));

      },[])
    return(
        <div>
           {
          (function () {
            const list = [];
            for (let i = 0; i < odai.length; i++) {
              list.push(<li key={i.toString()}>{<OgiriBox title={odai[i][0]} odai_id={odai[i][1]} />}</li>);
            }
            return <ul>{list}</ul>;
          }())
            }
        </div>
    )
};


type Props_OgiriBox = {
  title: string
  odai_id: string
}
const OgiriBox = (props:Props_OgiriBox) =>{
    const [flag_a, setFlag_a] = useState(false);
    const[flag_w, setFlag_w] = useState(false);
    const answer_o = () =>{
        setFlag_a(!flag_a)
    };
    const watch_o = () =>{
        setFlag_w(!flag_w)
    }


    return(
    <div>
        <span>{props.title}</span>
        <span><button name="answer" onClick={answer_o}>回答する</button></span>
        <span><button name="watch" onClick={watch_o}>{flag_w ? "回答を閉じる": "回答を見る"}</button></span>
        {flag_a &&
            <AnswerSend odai_id={props.odai_id}/>
        }
        {flag_w &&
            <AnswerList odai_id={props.odai_id}/>
        }
    </div>
    )
}
type Props_Answer = {
  odai_id: string
}
const AnswerList = (props:Props_Answer) =>{
    const [odai_answer, setOdai_answer] = useState([""]);
    const search_key = {key: props.odai_id};

    useEffect(() =>{
        fetch('/api/answer/get',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({search_key}),
            })
            .then((response) => response.json())
            .then((keys) => {
                setOdai_answer(keys.message)
            })
            .catch((error) => {
            console.error('Error:', error);
        });
    },[]);
    //useEffectで送る　送るもの　検索するするためのお題ID  =>OK
    //レスポンスをmapして答え一覧を作ってしたに入れる　一覧を入れるためのstateが必要


    return(
        <div>
            {
            (function () {
                const list = [];
            for (let i = 0; i < odai_answer.length; i++) {
              list.push(<li key={i.toString()} >{odai_answer[i][1]}</li>);
            }
                return <ul>{list}</ul>;
            }())
            }
        </div>
    )
};
const AnswerSend = (props:Props_Answer) =>{
    const [answer_send, setAnswer_send] = useState("");
    const answer = {content: answer_send, odai_id: props.odai_id};
    useEffect(() => {
        fetch('/api/answer/set', {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({answer}),
        })
          .then((response) => response.json())
          .then((keys) => {
              //入れたい処理があれば
          })
          .catch((error) => {
            console.error('Error:', error);
        });
    },[answer_send]);

     const send_answer = (e:any) =>{
        e.preventDefault();
        setAnswer_send(e.target[0].value);
    }
    return(
        <form onSubmit={send_answer}>
            <span>あなたの回答:</span>
            <input/>
            <button>投稿する</button>
        </form>
    )
}
const OdaiSend = () =>{
    const [odai_send, setOdai_send] = useState("");
    const odai = {1: odai_send};

    useEffect(() => {
        fetch('/api/odai/create', {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({odai}),
        })
          .then((response) => response.json())
          .then((keys) => {
          })
          .catch((error) => {
            console.error('Error:', error);
        });

    },[odai_send]);
    const send_odai = (e:any) =>{
        e.preventDefault();
        setOdai_send(e.target[0].value);
    }
    return(
        <form onSubmit={send_odai}>
            <input/>
            <button>お題を投稿する</button>
        </form>
    )
}

export default Body;
