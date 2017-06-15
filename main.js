var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleMiner = require('role.miner');
var roleTransporter = require('role.transporter');
var roleRefiller = require('role.refiller');
var spawningModule = require('spawningModule');
var roleDefenseRepairer = require('role.defenserepairer');

var roleLDHarvester = require('role.ldharvester');



// =============================================================================================
// ========    MAIN LOOP   =====================================================================
// =============================================================================================


module.exports.loop = function () {

    // number of required creeps
    var HARVESTERS_MAX_AMOUNT = 0;
    var BUILDERS_MAX_AMOUNT = 0;
    var UPGRADERS_MAX_AMOUNT = 4;
    var REPAIRERS_MAX_AMOUNT = 1;
    var MINERS_MAX_AMOUNT = 2;
    var TRANSPORTERS_MAX_AMOUNT = 2;
    var REFILLERS_MAX_AMOUNT = 2;
    var DEFENSE_REPAIRERS_MAX_AMOUNT = 1;

    var LD_HARVESTERS_MAX_AMOUNT = 4;

    var homeRoom = Game.rooms['W2N6'];
    var leftRoom = Game.rooms['W3N6'];


    // how many creeps exist
	var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
	var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
	var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
    var transporters = _.filter(Game.creeps, (creep) => creep.memory.role == 'transporter');
    var refillers = _.filter(Game.creeps, (creep) => creep.memory.role == 'refiller');
    var defenseRepairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'defenseRepairer');

    // information how many creeps live
    if (Game.time % 300 == 0) {
        console.log('(' + Game.time + ') H: ' + harvesters.length + ', [B: ' + builders.length + ', U: ' + upgraders.length + '], F: ' + refillers.length + ', [M: ' + miners.length + ', T: ' + transporters.length + '], [R: ' + repairers.length + ', DR: ' + defenseRepairers.length + ']');
    }

    // infrmation about energy production and consumption
    if (Game.time % 600 == 0) {
        var profit = Memory.energyProduced - Memory.energyConsumed;
        console.log('(' + Game.time + ') Energy produced: ' + Memory.energyProduced  + ' | Energy consumed: ' + Memory.energyConsumed + ' | Profit: ' + profit);
        console.log('(' + Game.time + ') EP M: ' + Memory.energyProducedByMiners + ' | EP LDH: ' + Memory.energyProducedByLDHarvesters + ' | EC U: ' + Memory.energyConsumedByUpgraders + ' | EC F: ' + Memory.energyConsumedByRefillers + ' | EC R: ' + Memory.energyConsumedByRepairers + ' | EC B: ' + Memory.energyConsumedByBuilders);
        Memory.energyProduced = 0;
        Memory.energyConsumed = 0;
        Memory.energyConsumedByRepairers = 0;
        Memory.energyConsumedByRefillers = 0;
        Memory.energyConsumedByUpgraders = 0;
        Memory.energyConsumedByBuilders = 0;
        Memory.energyProducedByLDHarvesters = 0;
        Memory.energyProducedByMiners = 0;
    }


	// deleting from memory non-existing creep
	for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
	
	// spawning new creeps
    spawningModule.createNewCreep(HARVESTERS_MAX_AMOUNT, 'harvester', 'H', 5, 4, 5);
    spawningModule.createNewCreep(UPGRADERS_MAX_AMOUNT, 'upgrader', 'U', 6, 6, 6);
    spawningModule.createNewCreep(BUILDERS_MAX_AMOUNT, 'builder', 'B', 5, 4, 5);
    spawningModule.createNewCreep(REPAIRERS_MAX_AMOUNT, 'repairer', 'R', 1, 2, 2);
    spawningModule.createNewCreep(DEFENSE_REPAIRERS_MAX_AMOUNT, 'defenseRepairer', 'DR', 2, 2, 2);
    spawningModule.createNewLDCreep(LD_HARVESTERS_MAX_AMOUNT, 'ldHarvester', 'LDH', 5, 9, 7, 'W2N6', '');
    spawningModule.createNewCreep(TRANSPORTERS_MAX_AMOUNT, 'transporter', 'T', 0, 6, 3);
    spawningModule.createNewCreep(MINERS_MAX_AMOUNT, 'miner', 'M', 5, 0, 3);
    spawningModule.createNewCreep(REFILLERS_MAX_AMOUNT, 'refiller', 'F', 0, 4, 2);

    // tower defense
    var towers = homeRoom.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_TOWER
    });
    for (let tower of towers) {
        var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target != undefined) {
            tower.attack(target);

        }
        
    }




    // creep's running
	for (var name in Game.creeps) {
		var creep = Game.creeps[name];
		if (creep.memory.role == 'harvester') {
			roleHarvester.run(creep);
		}
		else if (creep.memory.role == 'upgrader') {
			roleUpgrader.run(creep);
		}
		else if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        else if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        else if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        else if(creep.memory.role == 'transporter') {
            roleTransporter.run(creep);
        }
        else if(creep.memory.role == 'refiller') {
            roleRefiller.run(creep);
        }
        else if(creep.memory.role == 'defenseRepairer') {
            roleDefenseRepairer.run(creep);
        }
        else if(creep.memory.role == 'ldHarvester') {
            roleLDHarvester.run(creep);
        }
	}
}



