var roleRefiller = {

	run: function(creep) {

		if (creep.memory.working && creep.carry.energy == 0) creep.memory.working = false;
		if (!creep.memory.working && creep.carry.energy == creep.carryCapacity) creep.memory.working = true;

		if(creep.ticksToLive > 20) {

			if (creep.memory.working) {

				var targets = creep.room.find(FIND_STRUCTURES, {
	                    filter: (structure) => {
	                        return (structure.structureType == STRUCTURE_EXTENSION || 
	                        	structure.structureType == STRUCTURE_SPAWN ||
	                        	structure.structureType == STRUCTURE_TOWER) &&
	                            structure.energy < structure.energyCapacity;
	                    }
	            });
	            if(targets.length > 0) {
	                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
	                    creep.moveTo(targets[0]);
	                }
	            }
	            else {
	            	creep.moveTo(Game.flags['flagF']);
	            }
			}
			else {
				if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(creep.room.storage);
				}
				else if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == OK) {
					var carryParts = 0;
                    var EnergyCarried = 0;
                    for (i=0; i<creep.body.length; i++) {
                        if (creep.body[i].type == 'carry') {
                            carryParts = carryParts + 1;
                        }
                    }
                    EnergyCarried = 50*carryParts;
                    Memory.energyConsumed = Memory.energyConsumed + EnergyCarried;
                    Memory.energyConsumedByRefillers = Memory.energyConsumedByRefillers + EnergyCarried;
				}
			}
		}
		else {
			var energyLeft = creep.carry.energy;
			if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(creep.room.storage);
			}
			else if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == OK) {
				Memory.energyConsumed = Memory.energyConsumed - energyLeft;
				Memory.energyConsumedByRefillers = Memory.energyConsumedByRefillers - energyLeft;
			}
		}
	}
};


module.exports = roleRefiller;

