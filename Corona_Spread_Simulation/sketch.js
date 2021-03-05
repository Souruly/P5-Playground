let numberOfPeople = 100;
let people = [];
let totalSimTime = 2000;
let simTime = 0;
let vaccineFoundTime = 600;
let cureRate = 0.01;
let reinfectionPossible = true;

let alivePeopleCount = [numberOfPeople];
let uninfectedPeopleCount = [numberOfPeople - 1];
let deadPeopleCount = [0];
let curedPeopleCount = [0];
let infectedPeopleCount = [1];

let state = 0;
let vaccineFoundSlider;
let vaccineCureRateSlider;
let startSimButton;
let stopSimButton;
let restartSimButton;
let reinfectCheckbox;

let rightPane;

function setup() {
    createCanvas(1200, 600);
    textAlign(CENTER, CENTER);

    let patient0 = int(random(0, numberOfPeople));

    for (let i = 0; i < numberOfPeople; i++) {
        let p = new Person(i, random(5, 595), random(5, 595), false);
        if (i == patient0) {
            p.infected = true;
        }
        people.push(p)
    }

    vaccineFoundSlider = createSlider(100, 2050, 600, 50);
    vaccineFoundSlider.position(850, 220);
    vaccineCureRateSlider = createSlider(0, 0.5, 0.01, 0.001);
    vaccineCureRateSlider.position(820, 315);
    vaccineCureRateSlider.style('width', '200px');
    reinfectCheckbox = createCheckbox('Cured people can be reinfected', true);
    reinfectCheckbox.position(800, 250);
    reinfectCheckbox.changed(reinfectCheckboxEvent);
    startSimButton = createButton('Start Simulation');
    startSimButton.position(1070, 250);
    startSimButton.mousePressed(startSim);
    stopSimButton = createButton('Stop Simulation');
    stopSimButton.position(1070, 250);
    stopSimButton.mousePressed(stopSim);
    stopSimButton.hide();
    restartSimButton = createButton('Restart Simulation');
    restartSimButton.position(1070, 250);
    restartSimButton.mousePressed(restartSim);
    restartSimButton.hide();

    makeRightPane();
    createA('https://www.washingtonpost.com/graphics/2020/world/corona-simulator/', 'Inspired from this article','_blank');
}

function makeRightPane() {
    rightPane = createGraphics(600, 380);
    rightPane.textAlign(CENTER, CENTER);
    rightPane.background(240);
    rightPane.fill(0);
    rightPane.noStroke();
    rightPane.textSize(36);
    rightPane.text("Corona Virus Spread Simulation", 300, 50);
    rightPane.stroke(0);
    rightPane.strokeWeight(2);
    rightPane.line(0, 100, 600, 100);
}

function reinfectCheckboxEvent() {
    if (this.checked()) {
        reinfectionPossible = true;
    } else {
        reinfectionPossible = false;
    }
}

function startSim() {
    state = 1;
    startSimButton.hide();
    vaccineFoundSlider.hide();
    vaccineCureRateSlider.hide();
    reinfectCheckbox.hide();
    stopSimButton.show();

    drawGraphAxes();
}

function stopSim() {
    state = 2;
    stopSimButton.hide();
    restartSimButton.show();
}

function restartSim()
{
    location.reload();
}

function draw() {
    background(240);
    image(rightPane, 600, 0);
    drawStructure();
    for (let i = 0; i < numberOfPeople; i++) {
        people[i].show();
        if (state == 1) {
            people[i].update();
        }
    }
    if (state == 1) {
        simTime++;
        if (simTime == totalSimTime) {
            state++;
        }
        getStats();
    }

    if (state >= 1) {
        drawGraph();
    }

    if(simTime>=totalSimTime)
    {
        stopSim();
    }
}

function getStats() {
    alivePeople = 0;
    deadPeople = 0;
    curedPeople = 0;
    infectedPeople = 0;
    uninfectedPeople = 0
    for (let i = 0; i < numberOfPeople; i++) {
        l = people[i].life
        if (l > 0) {
            alivePeople++;
            if (l == totalSimTime) {
                uninfectedPeople++;
            }
            else {
                if (people[i].cured == true) {
                    curedPeople++;
                }
                else {
                    infectedPeople++;
                }
            }
        }
        else {
            deadPeople++;
        }
    }
    alivePeopleCount.push(alivePeople);
    deadPeopleCount.push(deadPeople);
    curedPeopleCount.push(curedPeople);
    infectedPeopleCount.push(infectedPeople);
    uninfectedPeopleCount.push(uninfectedPeople);
}

function drawGraphAxes() {
    rightPane.stroke(0);
    rightPane.strokeWeight(1);
    rightPane.line(50, 115, 50, 350);
    rightPane.line(40, 130, 60, 130);
    rightPane.line(30, 330, 460, 330);
    rightPane.line(450, 320, 450, 340);

    rightPane.textSize(16);
    rightPane.noStroke();
    rightPane.text("Dead",120,360);
    rightPane.text("Alive",188,360);
    rightPane.text("Uninfected",277,360);
    rightPane.text("Cured",374,360);
    rightPane.text("Infected",459,360);

    rightPane.noFill();
    rightPane.stroke(0);
    rightPane.ellipse(90,358,12,12);
    noStroke();
    rightPane.fill(0);
    rightPane.ellipse(160,358,12,12);
    rightPane.fill(133, 219, 37);
    rightPane.ellipse(230,358,12,12);
    rightPane.fill(51, 153, 255);
    rightPane.ellipse(343,358,12,12);
    rightPane.fill(255, 0, 127);
    rightPane.ellipse(420,358,12,12);

    rightPane.strokeWeight(2);
}

function drawGraph() {
    oX = 50;
    oY = 330;
    xMax = 400;
    yMax = 200;
    let x = map(simTime, 0, totalSimTime, 0, xMax);
    let y1 = map(alivePeopleCount[simTime], 0, numberOfPeople, 0, yMax);
    let y2 = map(uninfectedPeopleCount[simTime], 0, numberOfPeople, 0, yMax);
    // let y3 = map(deadPeopleCount[i], 0, numberOfPeople, 0, yMax);
    let y4 = map(curedPeopleCount[simTime], 0, numberOfPeople, 0, yMax);
    let y5 = map(infectedPeopleCount[simTime], 0, numberOfPeople, 0, yMax);
    rightPane.stroke(0);
    rightPane.point(oX + x, oY - y1);
    rightPane.stroke(133, 219, 37);
    rightPane.point(oX + x, oY - y2);
    // rightPane.stroke(0);
    // rightPane.point(oX+x,oY-y3);
    rightPane.stroke(51, 153, 255);
    rightPane.point(oX + x, oY - y4);
    rightPane.stroke(255, 0, 127);
    rightPane.point(oX + x, oY - y5);
}

function drawStructure() {
    fill(240);
    rect(0, 0, 600, 600);
    stroke(0);
    strokeWeight(2);
    line(1, 1, 1199, 1);
    line(599, 1, 599, 599);
    line(1199, 599, 1, 599);
    line(1, 599, 1, 1);
    line(1199, 1, 1199, 599);

    vaccineFoundTime = vaccineFoundSlider.value();
    cureRate = vaccineCureRateSlider.value();

    fill(0);
    noStroke();
    textSize(20);
    if (state == 0) {
        text("Please initialize the simulation", 900, 120);
        text("Total Sim Time = 2000 time units", 900, 180);
        text("Vaccine to be found at : " + vaccineFoundTime + " time units", 900, 210);
        text("Vaccine cure rate : " + cureRate, 900, 305);

    }

    stroke(0);
    strokeWeight(2);
    line(600, 380, 1200, 380);
    noStroke();
    if (state > 0) {
        text("Sim Time : " + simTime, 680, 400);
        textSize(16);
        text("Vaccine : " + vaccineFoundTime, 1120, 120);
        text("Reinfection : " + reinfectionPossible, 1110, 140);
        text("Cure Rate : " + cureRate, 1110, 160);
    }
    textSize(20);
    text("People alive : " + alivePeopleCount[simTime], 900, 430);
    text("People uninfected : " + uninfectedPeopleCount[simTime], 900, 460);
    text("People dead : " + deadPeopleCount[simTime], 900, 490);
    text("People cured : " + curedPeopleCount[simTime], 900, 520);
    text("Currently infected people count : " + infectedPeopleCount[simTime], 900, 560);


    noFill();
}
