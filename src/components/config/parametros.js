module.exports = {
    TE: '10h',
    IP: process.env.NODE_ENV == 'development' ? 'localhost' : 'servidorpm.ddns.net',
    PUBLIC_IP: 'servidorpm.ddns.net',
    PUERTO: process.env.NODE_ENV == 'development' ? 5555 : 7171,
    //PUERTO: 7171, 
    SECRET_TOKEN: 'c_:pwNc4;nCz#!wS4YdkeSB}%CFz[kf-giGR)}9RKpF2yX[w.dTJ2EPUtvDV()cG:fa:R]?5,VS#A}Cu',
    V: 4
}
