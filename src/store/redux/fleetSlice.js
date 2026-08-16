import { createSlice } from '@reduxjs/toolkit';

const getTimestamp = () => new Date().toLocaleTimeString();

const initialState = {
  vehicles: {
    'DRONE-ALPHA': { 
      id: 'DRONE-ALPHA', 
      name: 'Alpha Recon (Redux)', 
      status: 'IDLE', 
      battery: 92, 
      sector: 'SECTOR-1', 
      coords: [12, 45],
      history: [`[${getTimestamp()}] Redux RTK Engine initialized`] 
    },
    'ROVER-DELTA': { 
      id: 'ROVER-DELTA', 
      name: 'Delta Ground (Redux)', 
      status: 'SURVEYING', 
      battery: 64, 
      sector: 'SECTOR-3', 
      coords: [78, 31], 
      activeMission: 'SURVEY_MINERALS',
      history: [`[${getTimestamp()}] Redux RTK Engine initialized`] 
    },
    'SAT-ECHO': { 
      id: 'SAT-ECHO', 
      name: 'Echo Orbiter (Redux)', 
      status: 'IDLE', 
      battery: 99, 
      sector: 'ORBIT-A', 
      coords: [100, 100],
      history: [`[${getTimestamp()}] Redux RTK Engine initialized`] 
    },
  },
  selectedVehicleId: 'DRONE-ALPHA',
};

export const fleetSlice = createSlice({
  name: 'fleet',
  initialState,
  reducers: {
    selectVehicle: (state, action) => {
      state.selectedVehicleId = action.payload;
    },
    dispatchMission: (state, action) => {
      const { vehicleId, missionName, targetSector } = action.payload;
      const vehicle = state.vehicles[vehicleId];
      if (vehicle) {
        vehicle.status = 'SURVEYING';
        vehicle.sector = targetSector;
        vehicle.activeMission = missionName;
        vehicle.battery = Math.max(0, vehicle.battery - 15);
        vehicle.history = [
          `[${getTimestamp()}] Dispatched via Redux: ${missionName} to ${targetSector}`,
          ...(vehicle.history || []).slice(0, 3),
        ];
      }
    },
    recallVehicle: (state, action) => {
      const vehicle = state.vehicles[action.payload];
      if (vehicle) {
        vehicle.status = 'RETURNING';
        vehicle.activeMission = 'EN_ROUTE_TO_BASE';
        vehicle.history = [
          `[${getTimestamp()}] Recall signal triggered via Redux RTK`,
          ...(vehicle.history || []).slice(0, 3),
        ];
      }
    },
    setReadyToDock: (state, action) => {
      const vehicle = state.vehicles[action.payload];
      if (vehicle) {
        vehicle.status = 'READY_TO_DOCK';
        vehicle.sector = 'BASE-APPROACH';
        vehicle.activeMission = 'AWAITING_HANGAR_ENTRY';
        vehicle.history = [
          `[${getTimestamp()}] Arrived at base perimeter (Redux RTK)`,
          ...(vehicle.history || []).slice(0, 3),
        ];
      }
    },
    dockVehicle: (state, action) => {
      const vehicle = state.vehicles[action.payload];
      if (vehicle) {
        vehicle.status = 'IDLE';
        vehicle.activeMission = '';
        vehicle.sector = 'BASE-HANGAR';
        vehicle.battery = 100;
        vehicle.history = [
          `[${getTimestamp()}] Docked & recharged to 100% via Redux RTK`,
          ...(vehicle.history || []).slice(0, 3),
        ];
      }
    },
  },
});

export const { selectVehicle, dispatchMission, recallVehicle, setReadyToDock, dockVehicle } = fleetSlice.actions;
export default fleetSlice.reducer;
