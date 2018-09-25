//easy
/*var numArr = [
    [0, 0, 7, 0, 0, 8, 0, 1, 5],
    [0, 0, 0, 0, 0, 0, 6, 0, 0],
    [0, 9, 0, 0, 3, 1, 7, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 4, 0],
    [6, 4, 1, 0, 0, 0, 2, 8, 3],
    [0, 7, 0, 0, 0, 0, 0, 0, 0],
    [0, 3, 5, 8, 1, 0, 0, 9, 0],
    [0, 0, 9, 0, 0, 0, 0, 0, 0],
    [2, 1, 0, 7, 0, 0, 8, 0, 0],
];*/

var iStarts3X3 = {0:0, 1:0, 2:0, 3:3, 4:3, 5:3, 6:6, 7:6, 8:6};
var jStarts3X3 = {0:0, 1:0, 2:0, 3:3, 4:3, 5:3, 6:6, 7:6, 8:6};

function getPossibleAssignmentsForEachUnassignedCell() {
    var possibleAssignments = [];
    for(var i = 0; i < 9; i++) {
        possibleAssignments[i] = [];
        for(var j = 0; j < 9; j++) {
            possibleAssignments[i][j] = [];
        }
    }
    for(var i = 0; i < 9; i++) {
        for(var j = 0; j < 9; j++) {
            if(numArr[i][j] !== 0) continue;
            for(var num = 1; num <= 9; num++) {
                if(notInRow(i, j, num) && notInColumn(i, j, num) && notIn3X3(i, j, num)) {
                    possibleAssignments[i][j].push(num);
                }
            }
        }
    }
    
    return possibleAssignments;
}

function notInRow(i, j, num) {
    return numArr[i].indexOf(num) === -1
}

function notInColumn(i, j, num) {
    return numArr.map(function(row) { return row[j]; }).indexOf(num) === -1
}

function notIn3X3(i, j, num) {
    //find position in 3X3 Matrix
    var arr3X3 = [];
    for(var x = iStarts3X3[i]; x < iStarts3X3[i]+3; x++) {
        for(var y = jStarts3X3[j]; y < jStarts3X3[j]+3; y++) {
            arr3X3.push(numArr[x][y]);
        }        
    }
    return arr3X3.indexOf(num) === -1
}

function fillSingles(possibleAssignments) {
    for(var i = 0; i < 9; i++) {
        for(var j = 0; j < 9; j++) {
            if(possibleAssignments[i][j].length === 1) {
                //console.log("fill num=", possibleAssignments[0], ' i= ', i, ' j= ', j);
                numArr[i][j] = possibleAssignments[i][j][0];
            }
        }
    }
}

function isSolved() {
    for(var i = 0; i < 9; i++) {
        for(var j = 0; j < 9; j++) {
            if(numArr[i][j] === 0) return false;
        }
    }
    return true;
}

var step = 1;
function run() {
    console.log("step "+step++);
    var possibleAssignments = getPossibleAssignmentsForEachUnassignedCell();
    fillSingles(possibleAssignments);    
    console.log(numArr);
    if(!isSolved() && step < 1000) run();
}

console.log(numArr);
run();
