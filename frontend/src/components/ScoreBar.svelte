<script>
  export let score;
  export let max = 10;
  export let label = "";

  $: pct = Math.round((score / max) * 100);
  $: color = score >= 8 ? "bg-green-500" : score >= 5 ? "bg-yellow-400" : "bg-red-400";
</script>

<div class="w-full">
  {#if label}
    <div class="flex justify-between mb-1 text-sm font-medium text-gray-600">
      <span>{label}</span>
      <span>{score}/{max}</span>
    </div>
  {/if}
  <div class="w-full bg-gray-200 rounded-full h-3">
    <div class="h-3 rounded-full transition-all duration-500 {color}" style="width: {pct}%"></div>
  </div>
</div>
