const questions = [
{subject:"Digital Electronics",q:"Which logic gate gives HIGH output only when all inputs are HIGH?",o:["OR","AND","XOR","NOR"],a:1},
{subject:"Digital Electronics",q:"What is the binary equivalent of decimal 10?",o:["1010","1001","1100","1110"],a:0},
{subject:"Digital Electronics",q:"A flip-flop is primarily used to store:",o:["One bit","One byte","One word","One instruction"],a:0},
{subject:"Digital Electronics",q:"Which gate is known as a universal gate?",o:["AND","OR","NAND","XOR"],a:2},
{subject:"Digital Electronics",q:"A 4-bit binary counter has how many distinct states?",o:["4","8","16","32"],a:2},

{subject:"Analog Electronics",q:"A common-emitter amplifier mainly provides:",o:["Voltage gain","Only current gain","No gain","Only frequency division"],a:0},
{subject:"Analog Electronics",q:"An ideal op-amp has input impedance that is:",o:["Zero","Very low","Infinite","1 ohm"],a:2},
{subject:"Analog Electronics",q:"A diode is normally used for:",o:["Rectification","Data storage","Clock generation only","Magnetic shielding"],a:0},
{subject:"Analog Electronics",q:"The main purpose of a capacitor in a power supply is to:",o:["Filter ripple","Increase resistance","Generate heat","Store magnetic energy"],a:0},

{subject:"Electronic Devices",q:"In a BJT, the three terminals are:",o:["Gate, source, drain","Emitter, base, collector","Anode, cathode, gate","Input, output, ground"],a:1},
{subject:"Electronic Devices",q:"A MOSFET is primarily a:",o:["Voltage-controlled device","Current-controlled transformer","Mechanical switch","Light source"],a:0},
{subject:"Electronic Devices",q:"LED stands for:",o:["Light Emitting Diode","Low Energy Device","Linear Electronic Driver","Light Energy Detector"],a:0},
{subject:"Electronic Devices",q:"A Zener diode is commonly used for:",o:["Voltage regulation","Amplification","Oscillation only","Frequency multiplication only"],a:0},

{subject:"Communication Systems",q:"AM stands for:",o:["Amplitude Modulation","Analog Mixing","Automatic Modulation","Amplitude Multiplication"],a:0},
{subject:"Communication Systems",q:"FM varies the carrier's:",o:["Amplitude","Frequency","Power supply","Antenna length"],a:1},
{subject:"Communication Systems",q:"The process of recovering the original message from a modulated carrier is:",o:["Modulation","Demodulation","Sampling","Quantization"],a:1},
{subject:"Communication Systems",q:"Which medium is widely used for high-capacity long-distance optical communication?",o:["Copper wire","Optical fiber","Ferrite rod","Twisted relay"],a:1},

{subject:"Signals & Systems",q:"A continuous-time signal is defined for:",o:["Discrete integer indices only","Every value of time in an interval","Binary values only","Frequency only"],a:1},
{subject:"Signals & Systems",q:"The Fourier transform represents a signal in the:",o:["Time domain only","Frequency domain","Spatial domain only","Binary domain"],a:1},
{subject:"Signals & Systems",q:"A system whose output depends only on the present input is called:",o:["Memoryless","Unstable","Nonlinear","Periodic"],a:0},
{subject:"Signals & Systems",q:"Convolution is commonly used to find the output of a:",o:["LTI system","Battery","Transistor package","Logic probe"],a:0},

{subject:"Microprocessors",q:"Which register generally holds the address of the next instruction?",o:["Program Counter","Accumulator","Stack Pointer only","Status register"],a:0},
{subject:"Microprocessors",q:"The ALU performs:",o:["Arithmetic and logical operations","Only memory storage","Only communication","Only clock generation"],a:0},
{subject:"Microprocessors",q:"A microcontroller typically integrates CPU, memory and:",o:["Peripherals","Antenna tower","Transformer oil","Display glass only"],a:0},
{subject:"Microprocessors",q:"Which bus carries memory addresses?",o:["Data bus","Address bus","Control bus","Power bus"],a:1},

{subject:"VLSI",q:"VLSI means:",o:["Very Large Scale Integration","Variable Logic System Interface","Virtual Large Signal Input","Very Low Scale Integration"],a:0},
{subject:"VLSI",q:"CMOS technology uses mainly:",o:["MOSFETs","Relays","Vacuum tubes","Transformers"],a:0},
{subject:"VLSI",q:"A semiconductor chip is commonly fabricated on a:",o:["Silicon wafer","Copper plate","Glass bottle","Steel sheet"],a:0},

{subject:"Antennas & Wave Propagation",q:"An antenna is used to:",o:["Radiate or receive electromagnetic waves","Store digital data permanently","Convert AC to DC only","Measure resistance only"],a:0},
{subject:"Antennas & Wave Propagation",q:"A half-wave dipole has a total length approximately:",o:["λ/2","λ","2λ","λ/4"],a:0},
{subject:"Antennas & Wave Propagation",q:"Antenna gain is commonly expressed in:",o:["dBi or dBd","Ohms only","Volts only","Watts per second"],a:0},

{subject:"Embedded Systems & IoT",q:"IoT stands for:",o:["Internet of Things","Input of Technology","Integrated Output Transfer","Internet of Terminals"],a:0},
{subject:"Embedded Systems & IoT",q:"A sensor converts a physical quantity into a:",o:["Measurable electrical signal","Mechanical screw","Battery cell","Memory card"],a:0},
{subject:"Embedded Systems & IoT",q:"Which protocol is lightweight and commonly used for IoT messaging?",o:["MQTT","HDMI","VGA","SATA"],a:0}
];

let players = [
  {name:"Player 1", correct:0},
  {name:"Player 2", correct:0}
];
let current = 0;
let currentPlayer = 0;
let answered = false;
let timerId;
const TIME_LIMIT = 20;

const $ = id => document.getElementById(id);

$("startBtn").addEventListener("click", startQuiz);
$("nextBtn").addEventListener("click", nextQuestion);
$("restartBtn").addEventListener("click", () => location.reload());

function startQuiz(){
  const n1 = $("player1").value.trim() || "Player 1";
  const n2 = $("player2").value.trim() || "Player 2";
  players = [{name:n1,correct:0},{name:n2,correct:0}];
  current = 0;
  currentPlayer = 0;
  $("setup").classList.add("hidden");
  $("quiz").classList.remove("hidden");
  $("name1").textContent = n1;
  $("name2").textContent = n2;
  renderQuestion();
}

function renderQuestion(){
  answered = false;
  clearInterval(timerId);
  const item = questions[current];
  $("turnText").textContent = `${players[currentPlayer].name}'s Turn`;
  $("questionNo").textContent = `Q${current+1}`;
  $("progressText").textContent = `Question ${current+1} / ${questions.length}`;
  $("progressBar").style.width = `${((current+1)/questions.length)*100}%`;
  $("subjectTag").textContent = item.subject;
  $("question").textContent = item.q;
  $("nextBtn").disabled = true;
  $("nextBtn").textContent = current === questions.length-1 ? "View Final Result" : "Next Question";

  $("score1").classList.toggle("active", currentPlayer === 0);
  $("score2").classList.toggle("active", currentPlayer === 1);

  const options = $("options");
  options.innerHTML = "";
  item.o.forEach((text,index)=>{
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = `${String.fromCharCode(65+index)}. ${text}`;
    btn.addEventListener("click", ()=>selectAnswer(index, btn));
    options.appendChild(btn);
  });

  let remaining = TIME_LIMIT;
  $("timer").textContent = remaining;
  timerId = setInterval(()=>{
    remaining--;
    $("timer").textContent = remaining;
    if(remaining <= 0){
      clearInterval(timerId);
      timeUp();
    }
  },1000);
}

function selectAnswer(index, button){
  if(answered) return;
  answered = true;
  clearInterval(timerId);
  const correct = questions[current].a;
  document.querySelectorAll(".option").forEach((b,i)=>{
    b.disabled = true;
    if(i === correct) b.classList.add("correct");
  });
  if(index === correct){
    players[currentPlayer].correct++;
  }else{
    button.classList.add("wrong");
  }
  updateScores();
  $("nextBtn").disabled = false;
}

function timeUp(){
  if(answered) return;
  answered = true;
  const correct = questions[current].a;
  document.querySelectorAll(".option").forEach((b,i)=>{
    b.disabled = true;
    if(i === correct) b.classList.add("correct");
  });
  $("nextBtn").disabled = false;
  $("nextBtn").textContent = current === questions.length-1 ? "View Final Result" : "Time Up — Next Question";
}

function updateScores(){
  $("points1").textContent = players[0].correct * 10;
  $("points2").textContent = players[1].correct * 10;
}

function nextQuestion(){
  if(!answered) return;
  current++;
  if(current >= questions.length){
    showResult();
    return;
  }
  currentPlayer = current % 2;
  renderQuestion();
}

function showResult(){
  clearInterval(timerId);
  $("quiz").classList.add("hidden");
  $("result").classList.remove("hidden");

  const totalEach = Math.ceil(questions.length / 2);
  const p1Percent = Math.round((players[0].correct / totalEach) * 100);
  const p2Percent = Math.round((players[1].correct / totalEach) * 100);

  $("resultName1").textContent = players[0].name;
  $("resultName2").textContent = players[1].name;
  $("resultScore1").textContent = `${players[0].correct} / ${totalEach} correct`;
  $("resultScore2").textContent = `${players[1].correct} / ${totalEach} correct`;
  $("resultPercent1").textContent = `${p1Percent}%`;
  $("resultPercent2").textContent = `${p2Percent}%`;
  $("resultBar1").style.width = `${p1Percent}%`;
  $("resultBar2").style.width = `${p2Percent}%`;

  if(players[0].correct > players[1].correct){
    $("winner").textContent = `Higher score: ${players[0].name}`;
  }else if(players[1].correct > players[0].correct){
    $("winner").textContent = `Higher score: ${players[1].name}`;
  }else{
    $("winner").textContent = "Both players have the same score";
  }
}
