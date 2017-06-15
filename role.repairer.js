var roleRepairer = {

    run: function(creep) {

	    if(creep.memory.working && creep.carry.energy == 0) creep.memory.working = false;
	    if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) creep.memory.working = true;


        if(creep.ticksToLive > 20) {

    	    if(creep.memory.working) {
    	        var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => {
                        return s.hits < s.hitsMax && (s.structureType == STRUCTURE_ROAD ||
                            s.structureType == STRUCTURE_CONTAINER)   
                    }
                });
                if(target != undefined) {
                    if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
                else {
                	creep.moveTo(Game.flags['flagR']);
                }
    	    }
    	    else {
    	        if(creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
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
                    Memory.energyConsumedByRepairers = Memory.energyConsumedByRepairers + EnergyCarried;
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
                Memory.energyConsumedByRepairers = Memory.energyConsumedByRepairers - energyLeft;
            }
        }
	}
};

module.exports = roleRepairer;
