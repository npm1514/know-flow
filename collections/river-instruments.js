'use strict';

Globals.RiverInstruments = new Mongo.Collection('river-instruments');

Globals.RiverInstrument = Astro.Class({
  name: 'RiverInstrument',
  collection: RiverInstruments,
  fields: {
    riverId: {
      type: 'string',
      simpleValidator: 'required,string'
    },
    name: {
      type: 'string',
      simpleValidator: 'required,string'
    },
    siteId: {
      type: 'string',
      simpleValidator: 'required,string'
    },
    lat: {
      type: 'number',
      simpleValidator: 'required,number'
    },
    lng: {
      type: 'number',
      simpleValidator: 'required,number'
    }
  },
  methods: {
    currentGageHeight() {
      return this._currentDatum(RiverInstrument.GAGE_HEIGHT_CODE);
    },
    currentDischarge() {
      return this._currentDatum(RiverInstrument.DISCHARGE_CODE);
    },
    _currentDatum(paramCode) {
      return this.data().fetch().filter(d => d.paramCode === paramCode).reduce((d1, d2) => d1.timestamp > d2.timestamp ? d1 : d2).paramValue;
    }
  },
  relations: {
    data: {
      type: 'many',
      class: 'RiverDatum',
      local: '_id',
      foreign: 'riverInstrumentId'
    }
  }
});

RiverInstrument.GAGE_HEIGHT_CODE = '00065';
RiverInstrument.DISCHARGE_CODE = '00060';
