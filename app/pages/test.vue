<template>
  <div class="min-h-screen bg-background text-foreground p-8">
    <div class="max-w-md mx-auto space-y-4">
      <h1 class="text-2xl font-bold">Styling Test</h1>
      
      <!-- Basic Tailwind Test -->
      <div class="bg-red-500 text-white p-4 rounded">
        ✅ Basic Tailwind: bg-red-500 (This should be RED)
      </div>
      
      <!-- Test hardcoded HSL -->
      <div class="test-primary p-4 rounded">
        Test hardcoded HSL primary color
      </div>
      
      <!-- Test hardcoded card -->
      <div class="test-card p-4 rounded">
        Test hardcoded card with border
      </div>
      
      <!-- Theme Colors Test with fallback -->
      <div class="p-4 rounded" style="background-color: hsl(var(--primary, 221.2 83.2% 53.3%)); color: hsl(var(--primary-foreground, 210 40% 98%));">
        Inline style with CSS vars: primary
      </div>
      
      <!-- Theme Colors Test -->
      <div class="bg-primary text-primary-foreground p-4 rounded">
        Theme: bg-primary text-primary-foreground (Should be BLUE)
      </div>
      
      <div class="bg-card text-card-foreground border border-border p-4 rounded">
        Card: bg-card with border-border (Should have border)
      </div>
      
      <!-- Test Button with manual shadcn classes -->
      <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2">
        Manual shadcn Button Classes
      </button>
      
      <!-- Simple button with basic Tailwind -->
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Basic Tailwind Button (Should be BLUE)
      </button>
      
      <!-- Actual Button Component -->
      <UiButton class="w-full">
        Actual UiButton Component
      </UiButton>
      
      <!-- Debug: Show computed styles -->
      <div class="mt-8 p-4 bg-gray-100 text-black text-xs">
        <p>Debug info (check browser dev tools):</p>
        <p id="debug-primary">Primary color debug</p>
      </div>
    </div>
  </div>
</template>

<script setup>
onMounted(() => {
  // Debug CSS variables
  const root = document.documentElement;
  const primaryColor = getComputedStyle(root).getPropertyValue("--primary");
  console.log("CSS Variable --primary:", primaryColor);
  
  const debugEl = document.getElementById("debug-primary");
  if (debugEl) {
    debugEl.textContent = `--primary: "${primaryColor}"`;
  }
});
</script>
