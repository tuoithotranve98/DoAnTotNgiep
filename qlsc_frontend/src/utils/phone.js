/* eslint-disable max-len */
export const PHONE_REGEX = /((09|03|07|08|05)+([0-9]{8})\b)/;
export const VIETTEL_REGEX = /((086|096|097|098|032|033|034|035|036|037|038|039)+([0-9]{7})\b)/;
export const MOBIFONE_REGEX = /((089|090|093|070|076|077|078|079)+([0-9]{7})\b)/;
export const VINAPHONE_REGEX = /((088|091|094|081|082|083|084|085)+([0-9]{7})\b)/;
export const VNMOBILE_REGEX = /((092|056|058)+([0-9]{7})\b)/;
export const GMOBILE_REGEX = /((099|059|0199)+([0-9]{7})\b)/;

export const getTelecomProviderInfo = (phone) => {
  if (typeof phone !== 'string' || !phone || phone.trim() === '') return null;
  if (phone && phone.length !== 10) return null;
  if (VIETTEL_REGEX.test(phone)) {
    return {
      shortName: 'Viettel',
      name: 'Viettel',
      style: {
        color: '#55C54D',
        backgroundColor: '#55C54D21',
      },
    };
  }
  if (MOBIFONE_REGEX.test(phone)) {
    return {
      shortName: 'Mobi',
      name: 'Mobifone',
      style: {
        color: '#EE405E',
        backgroundColor: '#EE405E21',
      },
    };
  }
  if (VINAPHONE_REGEX.test(phone)) {
    return {
      shortName: 'Vina',
      name: 'Vinaphone',
      style: {
        color: '#F36D2D',
        backgroundColor: '#F36D2D21',
      },
    };
  }
  if (VNMOBILE_REGEX.test(phone)) {
    return {
      shortName: 'VNM',
      name: 'Vietnamobile',
      style: {
        color: '#9B51E0',
        backgroundColor: '#9B51E021',
      },
    };
  }
  if (GMOBILE_REGEX.test(phone)) {
    return {
      shortName: 'GMB',
      name: 'Gmobile',
      style: {
        color: '#F6C037',
        backgroundColor: '#F6C03721',
      },
    };
  }
  return null;
};

// regex 11 số
// export const PHONE_REGEX = /((09|03|07|08|05|016|012|019)+([0-9]{8})\b)/;
// export const VIETTEL_REGEX = /((086|096|097|098|032|033|034|035|036|037|038|039|0162|0163|0164|0165|0166|0167|0168|0169)+([0-9]{7})\b)/;
// export const MOBIFONE_REGEX = /((089|090|093|070|076|077|078|079|0120|0121|0122|0126|0128)+([0-9]{7})\b)/;
// export const VINAPHONE_REGEX = /((088|091|094|081|082|083|084|085|0123|0124|0125|0127|0129)+([0-9]{7})\b)/;
// export const GMOBILE_REGEX = /((099|059|0199)+([0-9]{7})\b)/;
