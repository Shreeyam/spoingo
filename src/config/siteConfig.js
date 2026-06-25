import shreeyam from '../../tenants/shreeyam/siteConfig.js';

const tenants = {
    shreeyam,
};

const tenantName = process.env.TENANT || 'shreeyam';
const siteConfig = tenants[tenantName];

if (!siteConfig) {
    throw new Error(
        `Unknown TENANT "${tenantName}". Add it to tenants/ and register in src/config/siteConfig.js. Known: ${Object.keys(tenants).join(', ')}`
    );
}

export default siteConfig;
