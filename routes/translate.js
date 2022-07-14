const { Router } = require('express')
const router = Router()

async function transliteCT(word){
  try {
    var answer = "", a = {};


    // // shifr -> Katta Lotin
    // a["1"]="A";
    // a["2"]="B";
    // a["3"]="C";
    // a["4"]="D";
    // a["5"]="E";
    // a["6"]="F";
    // a["7"]="G";
    // a["8"]="H";
    // a["9"]="I";
    // a["0"]="J";
    // a["q"]="K";
    // a["w"]="L";
    // a["e"]="M";
    // a["r"]="N";
    // a["t"]="O";
    // a["y"]="P";
    // a["u"]="Q";
    // a["!"]="R";
    // a["@"]="S";
    // a["#"]="T";
    // a["%"]="U";
    // a["$"]="V";
    // a["&"]="W";
    // a["*"]="X";
    // a["+"]="Y";
    // a["?"]="Z";

    // // Katta lotin -> Shifr
    // a["A"]="1";
    // a["B"]="2";
    // a["C"]="3";
    // a["D"]="4";
    // a["E"]="5";
    // a["F"]="6";
    // a["G"]="7";
    // a["H"]="8";
    // a["I"]="9";
    // a["J"]="0";
    // a["K"]="q";
    // a["L"]="w";
    // a["M"]="e";
    // a["N"]="r";
    // a["O"]="t";
    // a["P"]="y";
    // a["Q"]="u";
    // a["R"]="!";
    // a["S"]="@";
    // a["T"]="#";
    // a["U"]="%";
    // a["V"]="$";
    // a["W"]="&";
    // a["X"]="*";
    // a["Y"]="+";
    // a["Z"]="?";

    // shifr -> Kichik Lotin
    a["1"]="a";
    a["2"]="b";
    a["3"]="c";
    a["4"]="d";
    a["5"]="e";
    a["6"]="f";
    a["7"]="g";
    a["8"]="h";
    a["9"]="i";
    a["0"]="j";
        a["^"]="k";
        a["="]="l";
        a["<"]="m";
        a[">"]="n";
        a["{"]="o";
        a["}"]="p";
        a["|"]="q";
    a["!"]="r";
    a["@"]="s";
    a["#"]="t";
    a["%"]="u";
    a["$"]="v";
    a["&"]="w";
    a["*"]="x";
    a["+"]="y";
    a["?"]="z";

     // Kichik lotin -> Shifr
     a["a"]="1";
     a["b"]="2";
     a["c"]="3";
     a["d"]="4";
     a["e"]="5";
     a["f"]="6";
     a["g"]="7";
     a["h"]="8";
     a["i"]="9";
     a["j"]="0";
        a["k"]="^";
        a["l"]="=";
        a["m"]="<";
        a["n"]=">";
        a["o"]="{";
        a["p"]="}";
        a["q"]="|";
     a["r"]="!";
     a["s"]="@";
     a["t"]="#";
     a["u"]="%";
     a["v"]="$";
     a["w"]="&";
     a["x"]="*";
     a["y"]="+";
     a["z"]="?";


    for (let i = 0; i < word.length; i++){
      if (word.hasOwnProperty(i)) {
        if(word[i] === 's' && (word[i+1] === 'h' || word[i+1] === 'H')){
          let changes = word.split('')
          changes[i] = 'ş'
          changes[i+1] = ''
          word = changes.join('')
          console.log(word)
        }
        if(word[i] === 'S' && (word[i+1] === 'h' || word[i+1] === 'H')){
          let changes = word.split('')
          changes[i] = 'Ş'
          changes[i+1] = ''
          word = changes.join('')
          console.log(word)
        }
        if(word[i] === 'c' && (word[i+1] === 'h' || word[i+1] === 'H')){
          let changes = word.split('')
          changes[i] = 'ć'
          changes[i+1] = ''
          word = changes.join('')
          console.log(word)
        }
        if(word[i] === 'C' && (word[i+1] === 'h' || word[i+1] === 'H')){
          let changes = word.split('')
          changes[i] = 'Ć'
          changes[i+1] = ''
          word = changes.join('')
          console.log(word)
        }
        if(word[i] === 'G' && (word[i+1] === "'" || word[i+1] === "`")){
          let changes = word.split('')
          changes[i] = 'Ğ'
          changes[i+1] = ''
          word = changes.join('')
          console.log(word)
        }
        if(word[i] === 'g' && (word[i+1] === "'" || word[i+1] === "`")){
          let changes = word.split('')
          changes[i] = 'ğ'
          changes[i+1] = ''
          word = changes.join('')
          console.log(word)
        }
        if(word[i] === 'O' && (word[i+1] === "'" || word[i+1] === "`")){
          let changes = word.split('')
          changes[i] = 'Ō'
          changes[i+1] = ''
          word = changes.join('')
          console.log(word)
        }
        if(word[i] === 'o' && (word[i+1] === "'" || word[i+1] === "`")){
          let changes = word.split('')
          changes[i] = 'ō'
          changes[i+1] = ''
          word = changes.join('')
          console.log(word)
        }
        if (a[word[i]] === undefined){
          answer += word[i];
        } else {
          answer += a[word[i]];
        }
      }
    }
    return answer;
  } catch (err) {
    console.log(err)
  }
}

router.get('/', (req, res)=>{
  let result, original;  
  if(req.session.result && req.session.original) {
    original = req.session.original
    result = req.session.result
  }
  res.render('index', {result, original})
  req.session.result = undefined
  req.session.original = undefined
})

router.post('/', async (req, res)=>{
  req.session.original = req.body.text
  req.session.result = await transliteCT(req.body.text)
  res.redirect('/')
})

module.exports = router