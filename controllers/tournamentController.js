var Tournament = require('../models/tounament');

var MatchController = require('./matchController');
var RoundController = require('./roundController');


function getAllTournaments(req, res) {
    var query = {};
    var opts = {
        path: 'rounds.matchs'

    };
    if (req.query.game) {
        query.game = req.query.game;
    }
    Tournament
        .find(query)

    .populate("teams")
        .populate({
            path: 'rounds',
            populate: {
                path: 'matches',
                model: 'Match'
            }
        })

    .exec(function(err, tournaments) {
        if (err) {
            console.log(err)
        } else

            res.json(tournaments)

    });




}

async function getTournamentById(id) {
    return new Promise((resolve, reject) => {
        Tournament
            .findById(id)
            .populate("teams")
            .populate({
                path: 'rounds',
                populate: {
                    path: 'matches',
                    model: 'Match'
                }
            })
            .exec(function(err, tournament) {
                if (err) {
                    reject(err)
                } else

                    resolve(tournament);

            });
    })





}


function addTournament(req, res) {
    var tournament = new Tournament();
    console.log(req.body)
    tournament.name = req.body.name;
    tournament.maxPlayers = req.body.maxPlayers;
    tournament.game = req.body.game;
    tournament.save((err, t) => {
        if (err)
            res.json(err)

        res.json(t)
    });
}

async function joinTournamentById(id, team) {
    return new Promise((resolve, reject) => {
        Tournament
            .findById(id)
            .populate("teams")
            .populate({
                path: 'rounds',
                populate: {
                    path: 'matches',
                    model: 'Match'
                }
            })
            .exec(function(err, tournament) {
                if (err) {
                    console.log(err)
                } else {

                    if (tournament.maxTeams == tournament.teams.length)
                        console.log("team is full")
                    else if (tournament.maxTeams > tournament.teams.length) {
                        tournament.teams.push(team)
                        tournament.save(function(err, res) {
                            if (err) {
                                console.log(err)
                                reject(null)
                            } else {


                            }
                        })

                    }
                }
                resolve(tournament);

            });
    })
}


function addRoundToTournamentById(tournament, round, res) {

    Tournament
        .findById(req.params.tournamentId)
        .exec(function(err, tournament) {
            if (err) {
                console.log(err)
            } else {
                while (Math.round(Math.log(tournament.maxTeams)) < tournament.rounds.length()) {
                    tournament.rounds.push(req.body.round)
                    tournament.save(function(err, res) {
                        if (err) {
                            console.log(err)
                        } else {


                        }
                    })
                }


            }
            res.json(tournament);

        });




}



let initializeTournament = async(req, res) => {

    try {

        let tournament = await joinTournamentById(req.params.id, req.body.team)
        if (tournament == null) {
            return res.status(404).send()
        }
        if (tournament.teams.length == tournament.maxTeams) {
            for (let i = 0; i <= Math.round(Math.log(tournament.maxTeams)); i++) {


                let round = await RoundController.addRound()
                    // console.log(round)
                tournament.rounds.push(round)
            }
            let final = tournament.rounds[0]
            final.roundName = "final"
            let match = await MatchController.createMatch1("none")
            final.matches.push(match)
            for (let v = 0; v < tournament.rounds.length - 1; v++) {
                for (let j = 0; j < tournament.rounds[v].matches.length; j++) {
                    let nextMatchId = tournament.rounds[v].matches[j].id
                    let match1 = await MatchController.createMatch1(nextMatchId)
                    let match2 = await MatchController.createMatch1(nextMatchId)
                    tournament.rounds[v + 1].matches.push(match1)
                    tournament.rounds[v + 1].matches.push(match2)
                }
            }


            //for (let r = tournament.rounds.length - 1; r >= 0; r--) {
            round = tournament.rounds[tournament.rounds.length - 1]
            for (let z = 0; z < round.matches.length; z++) {
                let match = round.matches[z]
                let u = 0;
                match.teamA = tournament.teams[u]
                match.teamB = tournament.teams[u + 1]
                u = u + 2;
            }
            for (let r = tournament.rounds.length - 1; r > 0; r--) {


                for (let m = 0; m < tournament.rounds[r].matches.length; m++) {

                    let match = tournament.rounds[r].matches[m]


                    let winner = match.teamA
                    let nextMatchId = match.nextMatchId
                    if (match.scoreA <= match.scoreB) {
                        winner = match.teamB

                    }
                    console.log(winner)

                    let nextMatch = await MatchController.getLocalMatchById(nextMatchId)
                    console.log(nextMatch)

                    if (nextMatch.teamA !== 'undefined') {

                        nextMatch.teamB = winner


                    } else
                        nextMatch.teamA = winner
                    nextMatch.save(function(err, res) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log(nextMatch)
                        }
                    })
                    console.log(nextMatch)


                }
            }
            tournament.save(function(err, res) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(tournament)
                }
            })

            res.json(tournament)
        }



    } catch (e) {
        console.log(e)
        res.status(500).send()

    }

}
let startTournament = async(req, res) => {
    try {

        let tournament = await getTournamentById(req.params.id)
        if (tournament == null) {
            return res.status(404).send()
        }


        for (let r = tournament.rounds.length - 1; r > 0; r--) {
            for (let m = 0; m < tournament.rounds[r].matches.length; m++) {
                console.log(tournament.rounds[r].matches.length - 1)
                let match = tournament.rounds[r].matches[m]
                console.log(match)
                console.log(match.scoreA)
                console.log(match.scoreB)
                let winner = match.teamA
                if (match.scoreA <= match.scoreB)
                    winner = match.teamB
                console.log(winner)
                let nextMatchId = winner.nextMatchId
                let nextMatch = MatchController.getLocalMatchById(nextMatchId)
                console.log(nextMatch)
                if (nextMatch.teamA !== 'undefined') {
                    nextMatch.teamB = winner
                } else
                    nextMatch.teamA = winner

            }
        }
        tournament.save(function(err, res) {
            if (err) {
                console.log(err)
            } else {
                console.log(tournament)
            }
        })

        res.json(tournament)
    } catch (e) {
        console.log(e)
        res.status(500).send()

    }
}
module.exports = { startTournament, getAllTournaments, addTournament, getTournamentById, joinTournamentById, addRoundToTournamentById, initializeTournament }