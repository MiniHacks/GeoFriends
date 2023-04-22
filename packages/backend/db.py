def init_db(conn):
    create_table_sql = """
        CREATE TABLE IF NOT EXISTS geometries (
            userid TEXT,
            groupid TEXT,
            geometry GEOMETRY,
            CONSTRAINT unique_user_group_id UNIQUE (userid, groupid)
        );
    """
    
    with conn.cursor() as cur:
        cur.execute(create_table_sql)
        conn.commit()
        
def update_geom(conn, lat, lon, userid, groupid):
    update_geom_sql = """
        WITH input AS (
            SELECT ST_MakePoint(%s, %s) AS center
        ), upsert AS (
            INSERT INTO geometries (userid, groupid, geometry)
            VALUES (%s, %s, ST_Buffer((SELECT center FROM input), 0.1, 'quad_segs=2'))
            ON CONFLICT (userid, groupid)
            DO UPDATE SET geometry = ST_Union((
                SELECT geometry
                FROM geometries
                WHERE userid = %s AND groupid = %s
            ), ST_Buffer((SELECT center  FROM input), 0.1, 'quad_segs=2'))
            RETURNING geometry
        )
        UPDATE geometries g
        SET geometry = ST_Difference(g.geometry, u.geometry)
        FROM upsert u
        WHERE g.groupid = %s AND g.userid != %s;
    """
    
    with conn.cursor() as cur:
        cur.execute(update_geom_sql, (lat, lon, userid, groupid, userid, groupid, groupid, userid))
        conn.commit()