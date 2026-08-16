import { create } from 'zustand';

const getTimestamp = () => new Date().toLocaleTimeString();

export const useFleetStore = create((set) => ({
  vehicles: {
    'DRONE-ALPHA': { 
      id: 'DRONE-ALPHA', 
      name: 'Alpha Recon', 
      status: 'IDLE', 
      battery: 92, 
      sector: 'SECTOR-1', 
      coords: [12, 45],
      history: [`[${getTimestamp()}] Unit active and patrolling Sector 1`] 
    },
    'ROVER-DELTA': { 
      id: 'ROVER-DELTA', 
      name: 'Delta Ground', 
      status: 'SURVEYING', 
      battery: 64, 
      sector: 'SECTOR-3', 
      coords: [78, 31], 
      activeMission: 'SURVEY_MINERALS',
      history: [`[${getTimestamp()}] Mission SURVEY_MINERALS deployed`] 
    },
    'SAT-ECHO': { 
      id: 'SAT-ECHO', 
      name: 'Echo Orbiter', 
      status: 'IDLE', 
      battery: 99, 
      sector: 'ORBIT-A', 
      coords: [100, 100],
      history: [`[${getTimestamp()}] Orbital sync established`] 
    },
  },
  selectedVehicleId: 'DRONE-ALPHA',

  selectVehicle: (id) => set({ selectedVehicleId: id }),

  dispatchMission: (vehicleId, missionName, targetSector) =>
    set((state) => {
      const vehicle = state.vehicles[vehicleId];
      if (!vehicle) return state;

      return {
        vehicles: {
          ...state.vehicles,
          [vehicleId]: {
            ...vehicle,
            status: 'SURVEYING',
            sector: targetSector,
            activeMission: missionName,
            battery: Math.max(0, vehicle.battery - 15),
            history: [
              `[${getTimestamp()}] Dispatched: ${missionName} to ${targetSector}`,
              ...(vehicle.history || []).slice(0, 3), // Keep last 4 entries
            ],
          },
        },
      };
    }),

  recallVehicle: (vehicleId) => {
    set((state) => {
      const vehicle = state.vehicles[vehicleId];
      if (!vehicle) return state;

      return {
        vehicles: {
          ...state.vehicles,
          [vehicleId]: {
            ...vehicle,
            status: 'RETURNING',
            activeMission: 'EN_ROUTE_TO_BASE',
            history: [
              `[${getTimestamp()}] Recall signal triggered (RTB transit initiated)`,
              ...(vehicle.history || []).slice(0, 3),
            ],
          },
        },
      };
    });

    setTimeout(() => {
      set((state) => {
        const vehicle = state.vehicles[vehicleId];
        if (!vehicle || vehicle.status !== 'RETURNING') return state;

        return {
          vehicles: {
            ...state.vehicles,
            [vehicleId]: {
              ...vehicle,
              status: 'READY_TO_DOCK',
              sector: 'BASE-APPROACH',
              activeMission: 'AWAITING_HANGAR_ENTRY',
              history: [
                `[${getTimestamp()}] Arrived at base perimeter (Ready for Docking)`,
                ...(vehicle.history || []).slice(0, 3),
              ],
            },
          },
        };
      });
    }, 3000);
  },

  dockVehicle: (vehicleId) =>
    set((state) => {
      const vehicle = state.vehicles[vehicleId];
      if (!vehicle) return state;

      return {
        vehicles: {
          ...state.vehicles,
          [vehicleId]: {
            ...vehicle,
            status: 'IDLE',
            activeMission: '',
            sector: 'BASE-HANGAR',
            battery: 100,
            history: [
              `[${getTimestamp()}] Successfully docked in Hangar. Battery recharged to 100%`,
              ...(vehicle.history || []).slice(0, 3),
            ],
          },
        },
      };
    }),
}));
