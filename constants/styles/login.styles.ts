import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonPrimary: {
    alignItems: 'center',
    backgroundColor: '#00D9B5',
    borderRadius: 8,
    justifyContent: 'center',
    paddingVertical: 14,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  container: {
    flex: 1,
  },
  divider: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 24,
  },
  dividerLine: {
    backgroundColor: '#e0e0e0',
    flex: 1,
    height: 1,
  },
  dividerText: {
    color: '#999',
    fontSize: 14,
    marginHorizontal: 12,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  linkText: {
    color: '#00D9B5',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'right',
  },
  linkTextBold: {
    color: '#00D9B5',
    fontSize: 14,
    fontWeight: '600',
  },
  logo: {
    alignItems: 'center',
    backgroundColor: '#00D9B5',
    borderColor: '#fff',
    borderRadius: 40,
    borderWidth: 4,
    height: 80,
    justifyContent: 'center',
    width: 80,
  },
  logoContainer: {
    marginBottom: 16,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  socialButton: {
    alignItems: 'center',
    borderColor: '#e0e0e0',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    paddingVertical: 12,
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  socialContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  subtitle: {
    fontSize: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
});
