import { Request } from "express";
import geoip from "geoip-lite";
import requestIp from "request-ip";

const getCurrentContextData = (req: Request) => {
    const ip = requestIp.getClientIp(req);
    const location = ip ? geoip.lookup(ip) : null;
    const country = location?.country ? location.country.toString() : "unknown";
    const city = location?.city ? location.city.toString() : "unknown";
    const browser = req.useragent?.browser ? `${req.useragent.browser} ${req.useragent.version}` : "unknown";
    const platform = req.useragent?.platform ? req.useragent.platform.toString() : "unknown";
    const os = req.useragent?.os ? req.useragent.os.toString() : "unknown";
    const version = req.useragent?.version ? req.useragent?.version.toString() : "unknown";
    const isMobile = req.useragent?.isMobile || false;
    const isDesktop = req.useragent?.isDesktop || false;
    const isTablet = req.useragent?.isTablet || false;

    const deviceType = isMobile ? "Mobile" : isDesktop ? "Desktop" : isTablet ? "Tablet" : "unknown";
    return { ip, country, city, browser, version, os, platform, deviceType };
};

module.exports = getCurrentContextData;
