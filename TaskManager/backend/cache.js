const NodeCache = require("node-cache");

const cache = new NodeCache({ stdTTL:60, checkperiod:120 });

let hits = 0;
let misses = 0;

function getCache(key){
    const value = cache.get(key);
    if (value !== undefined) {hits++; return value; }
    misses++;
    return null;
}

function setCache(key,value,ttl){
    if(ttl != undefined) return cache.set(key,value,ttl);
    return cache.set(key,value);
}

function delCache(...keys) {
  keys.forEach((k) => cache.del(k));
}

function getStats() {
  return {
    hits,
    misses,
    hitRate: hits + misses === 0 ? "0%" : `${((hits / (hits + misses)) * 100).toFixed(1)}%`,
    keys: cache.keys(),
    nodeCacheStats: cache.getStats(),
  };
}

module.exports = { getCache, setCache, delCache, getStats };