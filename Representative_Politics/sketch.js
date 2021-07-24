let numCandidates = 32;
let numPeople = 500;

let people = [];
let peopleAverages = [];

let candidates0 = [];
let candAverage0;

let layer = 0;

let votingPhase = false;
let gameover = false;
let votesCast = 0;
let voters, candidates;
let currVoter, currCandidate;
let currentVoteCount = [];
let headingDiff;

let resetButton, electionsButton, voteButton;
// ----------------------------------------------------------

function indexOfSmallest(a) {
  let lowest = 0;
  for (let i = 1; i < a.length; i++) {
    if (a[i] < a[lowest]) lowest = i;
  }
  return lowest;
}

function indexOfLargest(a) {
  let largest = 0;
  for (let i = 1; i < a.length; i++) {
    if (a[i] > a[largest]) largest = i;
  }
  return largest;
}

// ----------------------------------------------------------

function initializeGame() {
  people = [];
  peopleAverages = [];
  candidates0 = [];
  candAverage0;

  votingPhase = false;
  layer = 0;

  electionsButton.show();
  let electionsButtonText = "Conduct Elections : " + "Layer " + String(layer);
  electionsButton.elt.innerHTML = electionsButtonText;

  voters = [];
  candidates = [];
  votesCast = 0;
  currVoteCount = [];
  currVoter = 0;
  currCandidate = 0;

  let pyramidBase = [];
  let avgPerson = createVector(0, 0);
  for (let i = 0; i < numPeople; i++) {
    let p = p5.Vector.random2D();
    avgPerson.add(p);
    pyramidBase.push(p);
  }
  avgPerson.normalize();
  people.push(pyramidBase);
  peopleAverages.push(avgPerson);

  candAverage0 = createVector(0, 0);
  for (let i = 0; i < numCandidates; i++) {
    let p = p5.Vector.random2D();
    candAverage0.add(p);
    candidates0.push(p);
  }
  candAverage0.normalize();

  if (people[layer].length == 1) {
    console.log("Cannot conduct any more elections");
    return;
  }
  //init players
  voters = [...people[layer]];
  candidates = [...people[layer]];
  if (layer == 0) {
    candidates = [...candidates0];
  }

  //init vote count
  for (let i = 0; i < candidates.length; i++) {
    currentVoteCount.push(0);
  }

  //set appropriate framerate
  let fr = round(map(voters.length, 0, 1000, 1, 120));
  frameRate(fr);
}

function castVote() {
  //voting
  currCandidate = findSuitable(voters[currVoter], currVoter, candidates);
  currentVoteCount[currCandidate] += 1;
  console.log("Voter : " + currVoter + " Voted : " + currCandidate);
  votesCast += 1;

  currVoter += 1;
  let candCopy = [...candidates];
  if (currVoter == voters.length) {
    //select top few
    let n = candidates.length * 0.5;
    let nextPyramidLayer = [];
    let nextLayerAverage = createVector(0, 0);
    for (let i = 0; i < n; i++) {
      let j = indexOfLargest(currentVoteCount);
      let p = candCopy[j];
      nextLayerAverage.add(p);
      nextPyramidLayer.push(p);
      candCopy.splice(j, 1);
      currentVoteCount.splice(j, 1);
    }
    nextLayerAverage.normalize();

    people.push(nextPyramidLayer);
    peopleAverages.push(nextLayerAverage);

    layer += 1;
    let electionsButtonText = "Conduct Elections : " + "Layer " + String(layer);
    electionsButton.elt.innerHTML = electionsButtonText;
    votesCast = 0;
    print("Layer : " + layer + " Elected : " + n);
    votingPhase = false;
    // voteButton.hide();
  }
}

function elections() {
  if (!votingPhase && !gameover) {
    votingPhase = true;
    votesCast = 0;
    currVoter = 0;
    currCandidate = 0;

    let electionsButtonText = "Conducting Elections...";
    electionsButton.elt.innerHTML = electionsButtonText;

    // voteButton.show();
    if (layer > 0) {
      voters = [];
      candidates = [];
      votesCast = 0;
      currVoteCount = [];
      currVoter = 0;
      currCandidate = 0;
      if (people[layer].length == 1) {
        console.log("Cannot conduct any more elections");
        votingPhase = false;
        gameover = true;
        electionsButton.hide();
        let v1 = peopleAverages[0];
        let v2 = peopleAverages[peopleAverages.length - 1];
        let a = p5.Vector.angleBetween(v1, v2);
        headingDiff = round(degrees(a));
        console.log(headingDiff);
        return;
      }
      //init players
      voters = [...people[layer]];
      candidates = [...people[layer]];
      if (layer == 0) {
        candidates = [...candidates0];
      }
    }
    console.log("Elections for layer : " + (layer + 1));
    console.log("Voters : " + voters.length);
    console.log("Candidates : " + candidates.length);
  }
}

function findSuitable(person, k, candids) {
  let dp = [];
  if (layer == 0) {
    for (let i = 0; i < candids.length; i++) {
      let p = p5.Vector.dot(person, candids[i]);
      dp.push(p);
    }
  } else {
    for (let i = 0; i < candids.length; i++) {
      if (i != k) {
        let p = p5.Vector.dot(person, candids[i]);
        dp.push(p);
      } else {
        dp.push(-10);
      }
    }
  }

  return indexOfLargest(dp);
}

// ----------------------------------------------------------

function setup() {
  textAlign(CENTER, CENTER);

  canvas = createCanvas(600, 600);
  canvas.parent("CanvasContainer");

  let electionsButtonText = "Conduct Elections : " + "Layer " + String(layer);
  electionsButton = createButton(electionsButtonText);
  electionsButton.parent("SketchControls");
  electionsButton.mousePressed(elections);

  initializeGame();

  resetButton = createButton("Reset Model");
  resetButton.parent("SketchControls");
  resetButton.mousePressed(initializeGame);

  
  // voteButton = createButton("Vote");
  // voteButton.parent("SketchControls");
  // voteButton.mousePressed(castVote);
  // voteButton.hide();
}

function draw() {
  background(240);
  showPeople();
  if (votingPhase && !gameover) {
    castVote();
  }

  if (gameover) {
    fill(0);
    noStroke();
    textSize(32);
    text("Difference : " + String(headingDiff) + "°", 350, 550);
  }
}

// ----------------------------------------------------------

/*
function showPeople() {
  for (let i = 0; i < layer + 1; i++) {
    noFill();
    strokeWeight(2);
    stroke(192);
    line(
      300,
      300,
      300 + peopleAverages[i].x * 250,
      300 + peopleAverages[i].y * 250
    );
    ellipse(
      300 + peopleAverages[i].x * 250,
      300 + peopleAverages[i].y * 250,
      10,
      10
    );
    push();
    translate(300 + peopleAverages[i].x * 250, 300 + peopleAverages[i].y * 250);
    fill(0);
    stroke(255);
    textSize(16);
    text("Avg " + i.toString(), 0, 0);
    pop();
  }
  noFill();
  if (layer == 0) {
    //Displaying people
    stroke(0);
    strokeWeight(0.1);
    for(i=0 ; i<people[layer].length ; i++)
    {
      
      push();
      translate(300, 300);
      if(i==currentVoter)
      {
       stroke(0,255,0);
       strokeWeight(3);
       line(0, 0, people[layer][i].x * 250, people[layer][i].y * 250);
       stroke(0);
       strokeWeight(0.1);
      }
      line(0, 0, people[layer][i].x * 250, people[layer][i].y * 250);
      pop();
    }

    strokeWeight(2);
    stroke(0);
    line(
      300,
      300,
      300 + peopleAverages[layer].x * 250,
      300 + peopleAverages[layer].y * 250
    );
    ellipse(
      300 + peopleAverages[layer].x * 250,
      300 + peopleAverages[layer].y * 250,
      10,
      10
    );

    noFill();
    //Displaying candidates
    stroke(0, 0, 255);
    strokeWeight(0.8);
    for(i=0 ; i<candidates.length ; i++)
    {
      push();
      translate(300, 300);
      line(0, 0, c.x * 250, c.y * 250);
      pop();
    });
  } else {
    //Displaying people
    stroke(0);
    strokeWeight(0.1);
    people[layer - 1].forEach((p) => {
      push();
      translate(300, 300);
      line(0, 0, p.x * 250, p.y * 250);
      pop();
    });

    strokeWeight(2);
    line(
      300,
      300,
      300 + peopleAverages[layer - 1].x * 250,
      300 + peopleAverages[layer - 1].y * 250
    );
    ellipse(
      300 + peopleAverages[layer - 1].x * 250,
      300 + peopleAverages[layer - 1].y * 250,
      10,
      10
    );

    //Displaying elected reps
    stroke(255, 0, 0);
    strokeWeight(0.5);
    people[layer].forEach((c) => {
      push();
      translate(300, 300);
      line(0, 0, c.x * 250, c.y * 250);
      pop();
    });

    strokeWeight(2);
    line(
      300,
      300,
      300 + peopleAverages[layer].x * 250,
      300 + peopleAverages[layer].y * 250
    );
    ellipse(
      300 + peopleAverages[layer].x * 250,
      300 + peopleAverages[layer].y * 250,
      10,
      10
    );
  }
}
*/

function showPeople() {
  // if (layer > 0) {

  if (votingPhase && votesCast > 0) {
    strokeWeight(8);
    stroke(0, 255, 0, 96);

    cv = currVoter - 1;
    if (cv < 0) cv = 0;
    cc = currCandidate;
    if (cc < 0) cc = 0;
    //Display Current Voter
    line(300, 300, 300 + voters[cv].x * 250, 300 + voters[cv].y * 250);

    //Display Current Candidate
    line(300, 300, 300 + candidates[cc].x * 250, 300 + candidates[cc].y * 250);
  }

  //Display Voters (Thin Black)
  strokeWeight(0.8);
  stroke(0);
  for (let i = 0; i < voters.length; i++) {
    line(300, 300, 300 + voters[i].x * 250, 300 + voters[i].y * 250);
  }

  //Display Candidates( Thin Red)
  strokeWeight(0.8);
  stroke(255, 0, 0);
  for (let i = 0; i < candidates.length; i++) {
    line(300, 300, 300 + candidates[i].x * 250, 300 + candidates[i].y * 250);
  }

  if (gameover) {
    noFill();
    strokeWeight(4);

    stroke(0, 255, 0);
    line(
      300,
      300,
      300 + peopleAverages[0].x * 250,
      300 + peopleAverages[0].y * 250
    );

    stroke(255, 0, 0);
    line(
      300,
      300,
      300 + peopleAverages[layer].x * 250,
      300 + peopleAverages[layer].y * 250
    );
  }

  for (let i = 0; i < layer + 1; i++) {
    noFill();
    strokeWeight(2);
    stroke(48);
    line(
      300,
      300,
      300 + peopleAverages[i].x * 250,
      300 + peopleAverages[i].y * 250
    );
    ellipse(
      300 + peopleAverages[i].x * 250,
      300 + peopleAverages[i].y * 250,
      10,
      10
    );
    push();
    translate(300 + peopleAverages[i].x * 250, 300 + peopleAverages[i].y * 250);
    fill(0);
    stroke(255);
    textSize(16);
    text("Avg " + i.toString(), 0, 0);
    pop();
  }
}
// ----------------------------------------------------------
