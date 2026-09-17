const Q=[
["Digital Electronics","Which gate gives HIGH output only when all inputs are HIGH?",["OR","AND","XOR","NOR"],1],
["Digital Electronics","Decimal 10 in binary is:",["1010","1001","1100","1110"],0],
["Digital Electronics","A flip-flop stores:",["One bit","One byte","One word","One instruction"],0],
["Digital Electronics","Which is a universal gate?",["AND","OR","NAND","XOR"],2],
["Digital Electronics","A 4-bit counter has how many states?",["4","8","16","32"],2],
["Analog Electronics","Ideal op-amp input impedance is:",["Zero","Very low","Infinite","1 ohm"],2],
["Analog Electronics","A common-emitter amplifier mainly provides:",["Voltage gain","Only frequency gain","No gain","Only loss"],0],
["Analog Electronics","A diode is commonly used for:",["Rectification","Data storage","Clock generation","Addressing"],0],
["Analog Electronics","A capacitor in a DC supply mainly:",["Filters ripple","Increases resistance","Generates heat","Stores magnetic energy"],0],
["Electronic Devices","BJT terminals are:",["Gate Source Drain","Emitter Base Collector","Anode Cathode Gate","Input Output Ground"],1],
["Electronic Devices","A MOSFET is mainly a:",["Voltage-controlled device","Transformer","Mechanical device","Light source"],0],
["Electronic Devices","LED means:",["Light Emitting Diode","Low Energy Device","Linear Electronic Driver","Light Energy Detector"],0],
["Electronic Devices","A Zener diode is used for:",["Voltage regulation","Amplification","Oscillation","Frequency division"],0],
["Communication Systems","AM stands for:",["Amplitude Modulation","Analog Mixing","Automatic Modulation","Amplitude Multiplication"],0],
["Communication Systems","FM varies the carrier:",["Amplitude","Frequency","Power supply","Antenna length"],1],
["Communication Systems","Recovering the original message is:",["Modulation","Demodulation","Sampling","Quantization"],1],
["Communication Systems","High-capacity long-distance optical medium:",["Copper","Optical fiber","Ferrite rod","Relay wire"],1],
["Signals & Systems","A continuous-time signal is defined for:",["Integer indices only","Every value of time","Binary values only","Frequency only"],1],
["Signals & Systems","Fourier transform gives the:",["Time domain","Frequency domain","Binary domain","Mechanical domain"],1],
["Signals & Systems","A system depending only on present input is:",["Memoryless","Unstable","Periodic","Random"],0],
["Signals & Systems","Convolution is used for an:",["LTI system","Antenna tower","Battery","Oscilloscope only"],0],
["Microprocessors","Next instruction address is held by:",["Program Counter","Accumulator","Status register","Decoder"],0],
["Microprocessors","ALU performs:",["Arithmetic and logical operations","Only storage","Only communication","Only clock generation"],0],
["Microprocessors","A microcontroller integrates CPU, memory and:",["Peripherals","Antenna tower","Transformer","Speaker coil"],0],
["Microprocessors","Which bus carries memory addresses?",["Data bus","Address bus","Control bus","Power bus"],1],
["VLSI","VLSI means:",["Very Large Scale Integration","Variable Logic System Interface","Virtual Large Signal Input","Very Low Scale Integration"],0],
["VLSI","CMOS technology mainly uses:",["MOSFETs","Relays","Vacuum tubes","Transformers"],0],
["VLSI","ICs are commonly fabricated on a:",["Silicon wafer","Copper plate","Steel sheet","Plastic bottle"],0],
["Antennas & Wave Propagation","An antenna is used to:",["Radiate/receive EM waves","Store data","Convert AC to DC only","Measure resistance"],0],
["Antennas & Wave Propagation","Approximate length of a half-wave dipole:",["λ/2","λ","2λ","λ/4"],0]
];
let P=[{name:"Player 1",ok:0},{name:"Player 2",ok:0}],i=0,turn=0,done=false,timer;
const $=x=>document.getElementById(x);
$("start").onclick=()=>{P[0].name=$("p1").value.trim()||"Player 1";P[1].name=$("p2").value.trim()||"Player 2";$("n1").textContent=P[0].name;$("n2").textContent=P[1].name;$("home").classList.remove("on");$("quiz").classList.add("on");show()};
$("again").onclick=()=>location.reload();
function show(){clearInterval(timer);done=false;let x=Q[i];$("turn").textContent=P[turn].name.toUpperCase()+"'S TURN";$("count").textContent=`QUESTION ${i+1} / ${Q.length}`;$("qno").textContent="Q"+(i+1);$("subject").textContent=x[0];$("q").textContent=x[1];$("prog").style.width=((i+1)/Q.length*100)+"%";$("c1").classList.toggle("active",turn===0);$("c2").classList.toggle("active",turn===1);$("next").disabled=true;$("next").textContent=i===Q.length-1?"VIEW RESULTS →":"NEXT QUESTION →";let box=$("opts");box.innerHTML="";x[2].forEach((v,k)=>{let b=document.createElement("button");b.className="option";b.textContent=String.fromCharCode(65+k)+". "+v;b.onclick=()=>answer(k,b);box.appendChild(b)});let t=20;$("time").textContent=t;timer=setInterval(()=>{t--;$("time").textContent=t;if(t<=0){clearInterval(timer);timeout()}},1000)}
function answer(k,b){if(done)return;done=true;clearInterval(timer);document.querySelectorAll(".option").forEach((x,n)=>{x.disabled=true;if(n===Q[i][3])x.classList.add("correct")});if(k===Q[i][3])P[turn].ok++;else b.classList.add("wrong");$("s1").textContent=P[0].ok*10;$("s2").textContent=P[1].ok*10;$("next").disabled=false}
function timeout(){if(done)return;done=true;document.querySelectorAll(".option").forEach((x,n)=>{x.disabled=true;if(n===Q[i][3])x.classList.add("correct")});$("next").disabled=false;$("next").textContent=i===Q.length-1?"VIEW RESULTS →":"TIME UP — NEXT →"}
$("next").onclick=()=>{if(!done)return;i++;if(i>=Q.length){result();return}turn=i%2;show()};
function result(){clearInterval(timer);$("quiz").classList.remove("on");$("result").classList.add("on");let a=Math.round(P[0].ok/15*100),b=Math.round(P[1].ok/15*100);$("rn1").textContent=P[0].name;$("rn2").textContent=P[1].name;$("pc1").textContent=a+"%";$("pc2").textContent=b+"%";$("rs1").textContent=P[0].ok+" / 15 Correct";$("rs2").textContent=P[1].ok+" / 15 Correct";setTimeout(()=>{$("rb1").style.width=a+"%";$("rb2").style.width=b+"%"},100);$("winner").textContent=P[0].ok>P[1].ok?"🎉 Higher Score: "+P[0].name:P[1].ok>P[0].ok?"🎉 Higher Score: "+P[1].name:"🤝 Same Score!"}