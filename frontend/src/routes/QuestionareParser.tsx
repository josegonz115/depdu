import { useState } from 'react'


// List of birth control options as objects
const listofBC = [
  {
    "name": "Birth Control Implant",
    "effectivity": 99,
    "duration": 5,
    "isHormonal": true,
    "frequency": "one-time",
    "isSTDProtected": false,
    "temporary": true,
    "isSafeForBreastFeeding": true,
    "cost": "high",
    "requiresFacility": true,
    "regulatesCycle": true,
    "requiresPrescription": true
  },
  {
    "name": "IUD",
    "effectivity": 99,
    "duration": 12,
    "isHormonal": true,
    "frequency": "one-time",
    "isSTDProtected": false,
    "temporary": true,
    "isSafeForBreastFeeding": true,
    "cost": "high",
    "requiresFacility": true,
    "regulatesCycle": true,
    "requiresPrescription": true
  },
  {
    "name": "Birth Control Shot",
    "effectivity": 96,
    "duration": 0.25,
    "isHormonal": true,
    "frequency": "quarterly",
    "isSTDProtected": false,
    "temporary": true,
    "isSafeForBreastFeeding": true,
    "cost": "low",
    "requiresFacility": true,
    "regulatesCycle": true,
    "requiresPrescription": true
  },
  {
    "name": "Birth Control Vaginal Ring",
    "effectivity": 93,
    "duration": 1,
    "isHormonal": true,
    "frequency": "monthly",
    "isSTDProtected": false,
    "temporary": true,
    "isSafeForBreastFeeding": true,
    "cost": "low",
    "requiresFacility": false,
    "regulatesCycle": true,
    "requiresPrescription": true
  },
  {
    "name": "Birth Control Patch",
    "effectivity": 93,
    "duration": 0.25,
    "isHormonal": true,
    "frequency": "weekly",
    "isSTDProtected": false,
    "temporary": true,
    "isSafeForBreastFeeding": true,
    "cost": "low",
    "requiresFacility": false,
    "regulatesCycle": true,
    "requiresPrescription": true
  },
  {
    "name": "Combination Birth Control Pills",
    "effectivity": 93,
    "duration": 0.083,
    "isHormonal": true,
    "frequency": "daily",
    "isSTDProtected": false,
    "temporary": true,
    "isSafeForBreastFeeding": false,
    "cost": "low",
    "requiresFacility": false,
    "regulatesCycle": true,
    "requiresPrescription": true
  },
  {
    "name": "Minipill",
    "effectivity": 93,
    "duration": 0.083,
    "isHormonal": true,
    "frequency": "daily",
    "isSTDProtected": false,
    "temporary": true,
    "isSafeForBreastFeeding": true,
    "cost": "low",
    "requiresFacility": false,
    "regulatesCycle": false,
    "requiresPrescription": true
  },
  {
    "name": "Latex Condom",
    "effectivity": 87,
    "duration": 0,
    "isHormonal": false,
    "frequency": "each use",
    "isSTDProtected": true,
    "temporary": true,
    "isSafeForBreastFeeding": true,
    "cost": "low",
    "requiresFacility": false,
    "regulatesCycle": false,
    "requiresPrescription": false
  },
  {
    "name": "Non-Latex Condom",
    "effectivity": 87,
    "duration": 0,
    "isHormonal": false,
    "frequency": "each use",
    "isSTDProtected": true,
    "temporary": true,
    "isSafeForBreastFeeding": true,
    "cost": "low",
    "requiresFacility": false,
    "regulatesCycle": false,
    "requiresPrescription": false
  },
  {
    "name": "Internal Condom",
    "effectivity": 79,
    "duration": 0,
    "isHormonal": false,
    "frequency": "each use",
    "isSTDProtected": true,
    "temporary": true,
    "isSafeForBreastFeeding": true,
    "cost": "low",
    "requiresFacility": false,
    "regulatesCycle": false,
    "requiresPrescription": false
  },
  {
    "name": "Diaphragm",
    "effectivity": 83,
    "duration": 0,
    "isHormonal": false,
    "frequency": "each use",
    "isSTDProtected": false,
    "temporary": true,
    "isSafeForBreastFeeding": true,
    "cost": "low",
    "requiresFacility": true,
    "regulatesCycle": false,
    "requiresPrescription": false
  },
  {
    "name": "Birth Control Sponge",
    "effectivity": 86,
    "duration": 0,
    "isHormonal": false,
    "frequency": "each use",
    "isSTDProtected": false,
    "temporary": true,
    "isSafeForBreastFeeding": true,
    "cost": "low",
    "requiresFacility": false,
    "regulatesCycle": false,
    "requiresPrescription": false
  },
  {
    "name": "Spermicide & Gel",
    "effectivity": 86,
    "duration": 0,
    "isHormonal": false,
    "frequency": "each use",
    "isSTDProtected": false,
    "temporary": true,
    "isSafeForBreastFeeding": true,
    "cost": "medium",
    "requiresFacility": false,
    "regulatesCycle": false,
    "requiresPrescription": false
  }
]
listofBC.map((obj, index) => console.log(`${obj.name}`));

const sampleAnswer = {
  "frequency": "monthly", // how often you have to apply the birth control: each use, daily, weekly, monthly, quarterly, one-time
  "isSTDProtected": false, 
  "isBreastFeeding": false,
  "cost": 50,
  "nearFacility": false,
  "hasMedicalConditions": false, // hormonal
  "isPlanningChildren": false,
  "regulatesCycle": false,
  "easeOfUse": "not important", // not important, somewhat important, very important
  "preferNoPrescription": true,
}

let points: { [key: string]: number } = {};
listofBC.map((obj) => {points[`${obj.name}`] = 0;});

// Birth Control Implant, IUD, Birth Control Shot, Birth Control Vaginal Ring, Birth Control Patch, Combination Birth Control Pills, Minipill, Latex Condom, Non-Latex Condom, Internal Condom, Diaphragm, Birth Control Sponge, Spermicide & Gel


// Given the frequency assign points
const frequencyParser = (frequency: string) => {
  if (frequency === "each use") {
    (points['Latex Condom'] as number) += 10;
    (points['Non-Latex Condom'] as number) += 10;
    (points['Internal Condom'] as number) += 10;
    (points['Diaphragm'] as number) +=  10;
    (points['Birth Control Sponge'] as number) += 10;
    (points['Spermicide & Gel'] as number) += 10;
  } 
  else if (frequency === "daily") {
    (points['Combination Birth Control Pills'] as number) += 10;
    (points['Minipill'] as number) += 10;
  }
  else if (frequency === "weekly") {
    (points['Birth Control Patch'] as number) += 10;
  }
  else if (frequency === "monthly") {
    (points['Birth Control Vaginal Ring'] as number) += 10;
  }
  else if (frequency === "quarterly") {
    (points['Birth Control Shot'] as number) += 10;
  }
  else if (frequency === "one time") {
    (points['Birth Control Implant'] as number) += 10;
    (points['IUD'] as number) += 10;
  }
}

// Given safe for breast feeding update points
const breastFeedingParser = (isBreastFeeding: boolean) => {
  listofBC.forEach((obj) => {
    const objName: string = obj.name;
    points[objName] += obj['isSafeForBreastFeeding'] == isBreastFeeding ? 10: 0; // if breast feeding boolean matches the object's boolean add 10 to points
  });
}

// Given near facility update points
const nearFacilityParser = (nearFacility: boolean) => {
  listofBC.forEach((obj) => {
    const objName: string = obj.name;
    points[objName] += obj['requiresFacility'] == nearFacility ? 10: 0; // if near facility boolean matches the object's boolean add 10 to points
  });
}

// Given near facility update points
const hasMedicalConditionParser = (hasMedicalCondition: boolean) => {
  listofBC.forEach((obj) => {
    const objName: string = obj.name;
    if (hasMedicalCondition) {
      points[objName] += obj['isHormonal'] ? -1000: 0; // if they have medical conditions do not recommend birth control that is hormonal
    }
  });
}

const isPlanningChildrenParser = (isPlanningChildren: boolean) => {
  listofBC.forEach((obj) => {
    const objName: string = obj.name;
    points[objName] += obj['temporary'] == isPlanningChildren ? -1000: 0; // if they have medical conditions do not recommend birth control that is hormonal

  });
}

// Given std protection assign points
const stdParser = (isStdProtected: boolean) => {
  listofBC.forEach((obj) => {
    const objName: string = obj.name;
    points[objName] += obj['isSTDProtected'] == isStdProtected ? 10: 0; // if STD protection boolean matches the object's boolean add 10 to points
  });
}

console.log('points', points);



// Given the frequency assign points
const QuestionareParser = () => {
  console.log(listofBC)
  return (
  <>
  <div>hello</div>
  </>
)}

export default QuestionareParser