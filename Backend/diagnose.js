import { exec } from 'child_process';
import { promisify } from 'util';
import https from 'https';
import dns from 'dns';

const execAsync = promisify(exec);
const dnsResolve = promisify(dns.resolve4);

console.log('🔍 COMPREHENSIVE NETWORK DIAGNOSTIC\n');
console.log('=' .repeat(60));

const hostname = 'db.huaobdzdkyueikyfyyqm.supabase.co';

// Test 1: Check Internet Connection
async function testInternet() {
  console.log('\n📡 Test 1: Internet Connection');
  console.log('-'.repeat(60));
  
  return new Promise((resolve) => {
    https.get('https://www.google.com', (res) => {
      if (res.statusCode === 200) {
        console.log('✅ Internet connection: WORKING');
        resolve(true);
      } else {
        console.log('❌ Internet connection: FAILED');
        resolve(false);
      }
    }).on('error', () => {
      console.log('❌ Internet connection: NO CONNECTION');
      resolve(false);
    });
  });
}

// Test 2: Check DNS Resolution
async function testDNS() {
  console.log('\n🌐 Test 2: DNS Resolution');
  console.log('-'.repeat(60));
  
  try {
    const addresses = await dnsResolve(hostname);
    console.log('✅ DNS Resolution: SUCCESS');
    console.log('   IP Addresses:', addresses.join(', '));
    return true;
  } catch (error) {
    console.log('❌ DNS Resolution: FAILED');
    console.log('   Error:', error.message);
    return false;
  }
}

// Test 3: Try Alternative DNS Servers
async function testAlternativeDNS() {
  console.log('\n🔄 Test 3: Alternative DNS Servers');
  console.log('-'.repeat(60));
  
  const dnsServers = [
    { name: 'Google DNS', server: '8.8.8.8' },
    { name: 'Cloudflare DNS', server: '1.1.1.1' },
    { name: 'OpenDNS', server: '208.67.222.222' }
  ];
  
  for (const { name, server } of dnsServers) {
    try {
      dns.setServers([server]);
      const addresses = await dnsResolve(hostname);
      console.log(`✅ ${name} (${server}): SUCCESS`);
      console.log(`   Resolved to: ${addresses[0]}`);
      return true;
    } catch (error) {
      console.log(`❌ ${name} (${server}): FAILED`);
    }
  }
  
  // Reset to system DNS
  dns.setServers([]);
  return false;
}

// Test 4: Check if Supabase is accessible
async function testSupabase() {
  console.log('\n🏢 Test 4: Supabase Service Status');
  console.log('-'.repeat(60));
  
  return new Promise((resolve) => {
    https.get('https://supabase.com', (res) => {
      if (res.statusCode === 200) {
        console.log('✅ Supabase website: ACCESSIBLE');
        resolve(true);
      } else {
        console.log('❌ Supabase website: NOT ACCESSIBLE');
        resolve(false);
      }
    }).on('error', (error) => {
      console.log('❌ Supabase website: ERROR');
      console.log('   Error:', error.message);
      resolve(false);
    });
  });
}

// Test 5: Check Firewall/Port
async function testPort() {
  console.log('\n🔒 Test 5: Port 5432 Connectivity');
  console.log('-'.repeat(60));
  
  try {
    const { stdout } = await execAsync(`powershell "Test-NetConnection -ComputerName ${hostname} -Port 5432 -InformationLevel Quiet"`);
    if (stdout.trim() === 'True') {
      console.log('✅ Port 5432: OPEN');
      return true;
    } else {
      console.log('❌ Port 5432: BLOCKED');
      return false;
    }
  } catch (error) {
    console.log('⚠️  Port test: UNABLE TO TEST');
    console.log('   (PowerShell command failed)');
    return false;
  }
}

// Test 6: Check VPN/Proxy
async function testVPN() {
  console.log('\n🔐 Test 6: VPN/Proxy Detection');
  console.log('-'.repeat(60));
  
  try {
    const { stdout } = await execAsync('ipconfig');
    const hasVPN = stdout.toLowerCase().includes('vpn') || 
                   stdout.toLowerCase().includes('virtual adapter') ||
                   stdout.toLowerCase().includes('tap-windows');
    
    if (hasVPN) {
      console.log('⚠️  VPN/Virtual Adapter: DETECTED');
      console.log('   This might be blocking the connection');
      return true;
    } else {
      console.log('✅ VPN/Virtual Adapter: NOT DETECTED');
      return false;
    }
  } catch (error) {
    console.log('⚠️  VPN Detection: UNABLE TO CHECK');
    return false;
  }
}

// Main diagnostic function
async function runDiagnostics() {
  const results = {
    internet: false,
    dns: false,
    alternativeDNS: false,
    supabase: false,
    port: false,
    vpn: false
  };
  
  results.internet = await testInternet();
  results.dns = await testDNS();
  
  if (!results.dns) {
    results.alternativeDNS = await testAlternativeDNS();
  }
  
  results.supabase = await testSupabase();
  results.port = await testPort();
  results.vpn = await testVPN();
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 DIAGNOSTIC SUMMARY');
  console.log('='.repeat(60));
  
  console.log('\nTest Results:');
  console.log(`  Internet Connection:    ${results.internet ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`  DNS Resolution:         ${results.dns ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`  Alternative DNS:        ${results.alternativeDNS ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`  Supabase Accessible:    ${results.supabase ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`  Port 5432 Open:         ${results.port ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`  VPN Detected:           ${results.vpn ? '⚠️  YES' : '✅ NO'}`);
  
  // Diagnosis
  console.log('\n🔍 ROOT CAUSE ANALYSIS:');
  console.log('-'.repeat(60));
  
  if (!results.internet) {
    console.log('❌ PRIMARY ISSUE: No Internet Connection');
    console.log('   → Check your network connection');
    console.log('   → Restart your router/modem');
  } else if (!results.dns && !results.alternativeDNS) {
    console.log('❌ PRIMARY ISSUE: DNS Resolution Failure');
    console.log('   → Your DNS server cannot resolve Supabase hostname');
    console.log('   → Try changing DNS to Google DNS (8.8.8.8)');
  } else if (results.vpn) {
    console.log('⚠️  POSSIBLE ISSUE: VPN/Proxy Interference');
    console.log('   → Disconnect VPN and try again');
    console.log('   → Check proxy settings');
  } else if (!results.port) {
    console.log('❌ PRIMARY ISSUE: Port 5432 Blocked');
    console.log('   → Firewall is blocking PostgreSQL port');
    console.log('   → Check Windows Firewall settings');
  } else if (!results.supabase) {
    console.log('❌ PRIMARY ISSUE: Supabase Service Down');
    console.log('   → Supabase might be experiencing issues');
    console.log('   → Check https://status.supabase.com');
  } else {
    console.log('⚠️  UNKNOWN ISSUE');
    console.log('   → The hostname might be incorrect');
    console.log('   → Verify your Supabase project exists');
    console.log('   → Check Supabase dashboard for correct connection string');
  }
  
  // Solutions
  console.log('\n💡 RECOMMENDED SOLUTIONS:');
  console.log('-'.repeat(60));
  
  if (!results.dns) {
    console.log('\n1️⃣  Change DNS to Google DNS:');
    console.log('   • Open Network Settings');
    console.log('   • Change DNS to: 8.8.8.8 and 8.8.4.4');
    console.log('   • Run: ipconfig /flushdns');
  }
  
  if (results.vpn) {
    console.log('\n2️⃣  Disable VPN:');
    console.log('   • Disconnect any VPN connections');
    console.log('   • Try connecting again');
  }
  
  if (!results.port) {
    console.log('\n3️⃣  Allow Port 5432 in Firewall:');
    console.log('   • Open Windows Defender Firewall');
    console.log('   • Add inbound rule for port 5432');
  }
  
  console.log('\n4️⃣  Verify Supabase Project:');
  console.log('   • Login to https://supabase.com/dashboard');
  console.log('   • Check if project exists');
  console.log('   • Get fresh connection string from Database settings');
  
  console.log('\n5️⃣  Alternative: Use Local PostgreSQL:');
  console.log('   • Install PostgreSQL locally');
  console.log('   • Use: postgresql://postgres:password@localhost:5432/postgres');
  
  console.log('\n' + '='.repeat(60));
}

runDiagnostics().catch(console.error);
