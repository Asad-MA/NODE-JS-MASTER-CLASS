const  ENV = {
    production: {
        port: 4000,
        envName: 'production'
    },
    staging:{
        port: 4001,
        envName: 'staging',
    }
}

const currentEnv = process.env.NODE_ENV? process.env.NODE_ENV.toLowerCase(): null;

console.log('Current ENV' , currentEnv);

const exportEnv = ENV[currentEnv] ? ENV[currentEnv] : ENV['staging'];

export default exportEnv;