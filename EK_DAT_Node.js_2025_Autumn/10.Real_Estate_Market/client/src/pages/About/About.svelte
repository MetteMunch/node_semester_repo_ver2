<script>

    let realEstateAgents;

    fetch("http://localhost:8080/realestateagents")
        .then((response) => response.json())   //// kan også bruge await - tjek det ud
        .then((result) => {
            console.log(result);
            realEstateAgents = result.data;
        });
</script>

<h1>About</h1>
<h2>Real estate agents...</h2>
{#each realEstateAgents as realEstateAgent (realEstateAgent)}
    <p>{realEstateAgent}</p>
{/each}
