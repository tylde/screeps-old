module.exports = {

	 createNewCreep: function(maxAmount, type, prefix, workParts, carryParts, moveParts) {
	    var amount = _.filter(Game.creeps, (creep) => creep.memory.role == type);
	    if(amount.length < maxAmount) {

	        var creepBody = [];
	        for (i=0; i<workParts; i++) { creepBody.push(WORK); }
	        for (i=0; i<carryParts; i++) { creepBody.push(CARRY); }
	        for (i=0; i<moveParts; i++) { creepBody.push(MOVE); }

	        loopFor:
	        for (i=1; i<=maxAmount+1;) {
	            var tempName = prefix + i;
	            var newName = Game.spawns['Alpha'].createCreep(creepBody, tempName, {role: type, working: false});
	            switch (newName) {
	                case ERR_BUSY:
	                    break loopFor;
	                case ERR_NOT_ENOUGH_ENERGY:
	                    break loopFor;
	                case ERR_NAME_EXISTS:
	                    i++; break;
	                default:
	                    console.log('Spawning new ' + type + ': ' + newName); break loopFor;
	            }
	        }
	    }
	},

	createNewLDCreep: function(maxAmount, type, prefix, workParts, carryParts, moveParts, home, dest) {
	    var amount = _.filter(Game.creeps, (creep) => creep.memory.role == type);
	    if(amount.length < maxAmount) {

	        var creepBody = [];
	        for (i=0; i<workParts; i++) { creepBody.push(WORK); }
	        for (i=0; i<carryParts; i++) { creepBody.push(CARRY); }
	        for (i=0; i<moveParts; i++) { creepBody.push(MOVE); }

	        loopFor:
	        for (i=1; i<=maxAmount+1;) {
	            var tempName = prefix + i;
	            var newName = Game.spawns['Alpha'].createCreep(creepBody, tempName, {role: type, working: false, home: home, dest: dest});
	            switch (newName) {
	                case ERR_BUSY:
	                    break loopFor;
	                case ERR_NOT_ENOUGH_ENERGY:
	                    break loopFor;
	                case ERR_NAME_EXISTS:
	                    i++; break;
	                default:
	                    console.log('Spawning new ' + type + ': ' + newName); break loopFor;
	            }
	        }
	    }
	}
};
