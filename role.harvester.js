var roleHarvester = {

	run: function(creep) {

        if(creep.memory.working && creep.carry.energy == 0) creep.memory.working = false;
        if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) creep.memory.working = true;

		if(!creep.memory.working) {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
			if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
			    creep.moveTo(source);
			}
		}
		else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || 
                        	structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            else {
                if(creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage);
                }
            }
        }
	}
};


module.exports = roleHarvester;
