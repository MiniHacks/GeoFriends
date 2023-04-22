def init_db(conn):
    create_table_sql = """
        CREATE TABLE IF NOT EXISTS geometries (
            userid TEXT,
            groupid TEXT,
            geometry GEOMETRY,
            CONSTRAINT unique_user_group_id UNIQUE (userid, groupid)
        );
    """
    
    cur = conn.cursor()
    cur.execute(create_table_sql)
    conn.commit()
    cur.close()
        
def update_geom(conn, lat, lon, userid, groupid):
    update_geom_sql = """
        WITH input AS (
            SELECT ST_MakePoint(%s, %s) AS center
        ), upsert AS (
            INSERT INTO geometries (userid, groupid, geometry)
            VALUES (%s, %s, ST_Buffer((SELECT center FROM input), 0.001, 'quad_segs=2'))
            ON CONFLICT (userid, groupid)
            DO UPDATE SET geometry = ST_Union((
                SELECT geometry
                FROM geometries
                WHERE userid = %s AND groupid = %s
            ), ST_Buffer((SELECT center  FROM input), 0.001, 'quad_segs=2'))
            RETURNING geometry
        )
        UPDATE geometries g
        SET geometry = ST_Difference(g.geometry, u.geometry)
        FROM upsert u
        WHERE g.groupid = %s AND g.userid != %s;
    """
    
    cur = conn.cursor()
    cur.execute(update_geom_sql, (lat, lon, userid, groupid, userid, groupid, groupid, userid))
    conn.commit()
    cur.close()
        
def get_group_geom(conn, groupid):
    get_group_geom_sql = """
        SELECT jsonb_object_agg(userid, ST_AsGeoJSON(geometry)::jsonb) AS geometries_by_user
        FROM geometries
        WHERE groupid = %s;
    """
    
    cur = conn.cursor()
    cur.execute(get_group_geom_sql, (groupid,))
    result = cur.fetchone()[0]
    cur.close()
    return result
