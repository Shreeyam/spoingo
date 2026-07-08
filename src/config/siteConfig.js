import shreeyam from '../../tenants/shreeyam/siteConfig.js';
import marie from '../../tenants/marie/siteConfig.js';

const tenants = {
    shreeyam,
    marie,
};

const tenantName = process.env.TENANT || 'shreeyam';
const siteConfig = tenants[tenantName];

if (!siteConfig) {
    throw new Error(
        `Unknown TENANT "${tenantName}". Add it to tenants/ and register in src/config/siteConfig.js. Known: ${Object.keys(tenants).join(', ')}`
    );
}

export default siteConfig;
