<script>
  import Navbar from '$lib/components/Navbar.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import UseCase from '$lib/components/UseCase.svelte';
  import WhyPrivate from '$lib/components/WhyPrivate.svelte';
  import Services from '$lib/components/Services.svelte';
  import Pricing from '$lib/components/Pricing.svelte';
  import Security from '$lib/components/Security.svelte';
  import FAQ from '$lib/components/FAQ.svelte';
  import FinalCTA from '$lib/components/FinalCTA.svelte';
  import Footer from '$lib/components/Footer.svelte';
</script>

<Navbar />

<main>
  <Hero />
  <UseCase />
  <WhyPrivate />
  <Services />
  <Pricing />
  <Security />
  <FAQ />
  <FinalCTA />
</main>

<Footer />
